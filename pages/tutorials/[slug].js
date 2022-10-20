import Link from "next/link";
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

  function addStep() {
    setCurrentStep((prevCurrentStep) =>
      prevCurrentStep < steps.length ? prevCurrentStep + 1 : prevCurrentStep
    );
  }

  function subtractStep() {
    setCurrentStep((prevCurrentStep) =>
      prevCurrentStep > 0 ? prevCurrentStep - 1 : 0
    );
  }

  return (
    <>
      <Headline>{name}</Headline>

      {currentStep === 0 ? (
        <TutorialStartCard />
      ) : currentStep < steps.length ? (
        <TutorialCard step={steps[currentStep]} />
      ) : (
        <h2>done</h2>
      )}

      <ButtonContainer>
        {currentStep === 0 ? (
          <>
            <Link href="/tutorials">
              <Button isPrimary={false}>back to library</Button>
            </Link>
          </>
        ) : (
          <Button isPrimary={false} onClick={() => subtractStep()}>
            prev
          </Button>
        )}
        {currentStep !== steps.length && (
          <Button isPrimary={true} onClick={() => addStep()}>
            {currentStep === 0 ? "start" : "next"}
          </Button>
        )}
      </ButtonContainer>
    </>
  );
}
