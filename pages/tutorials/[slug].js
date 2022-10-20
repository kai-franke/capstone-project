import { useState } from "react";
import { Button, ButtonContainer } from "../../components/Buttons";
import Headline from "../../components/Headline";
import TutorialCard from "../../components/TutorialCard";
import TutorialStartCard from "../../components/TutorialStartCard";
import {
  getAllTutorials,
  getTutorialBySlug,
} from "../../services/tutorialService";

export async function getStaticPaths() {
  const tutorials = await getAllTutorials();
  const slugs = tutorials.map((tutorial) => tutorial.slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const tutorial = await getTutorialBySlug(slug);

  return {
    props: {
      name: tutorial.name,
      steps: tutorial.steps,
      id: tutorial.id,
      slug: slug,
    },
  };
}

export default function Tutorial({ name, steps, id, slug }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Headline>{name}</Headline>
      {currentStep === 0 ? (
        <>
          <TutorialStartCard />
          <ButtonContainer>
            <Button
              isPrimary={true}
              onClick={() =>
                setCurrentStep((prevCurrentStep) => prevCurrentStep + 1)
              }
            >
              start
            </Button>
          </ButtonContainer>
        </>
      ) : currentStep < steps.length ? (
        <>
          <TutorialCard step={steps[currentStep]} />
          <ButtonContainer>
            <Button
              isPrimary={false}
              onClick={() =>
                setCurrentStep((prevCurrentStep) =>
                  prevCurrentStep > 0 ? prevCurrentStep - 1 : 0
                )
              }
            >
              prev
            </Button>
            <Button
              isPrimary={true}
              onClick={() =>
                setCurrentStep((prevCurrentStep) =>
                  prevCurrentStep < steps.length
                    ? prevCurrentStep + 1
                    : prevCurrentStep
                )
              }
            >
              next
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <h2>done</h2>
          <ButtonContainer>
            <Button
              isPrimary={false}
              onClick={() =>
                setCurrentStep((prevCurrentStep) =>
                  prevCurrentStep > 0 ? prevCurrentStep - 1 : 0
                )
              }
            >
              prev
            </Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
}
