import Link from "next/link";
import { useState } from "react";
import { Button, ButtonContainer } from "../../components/Buttons";
import { Headline } from "../../components/TextElements";
import TutorialCard from "../../components/TutorialCard";
import TutorialEndCard from "../../components/TutorialEndCard";
import TutorialStartCard from "../../components/TutorialStartCard";
import { getTutorialBySlug } from "../../services/tutorialService";

export async function getServerSideProps(context) {
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

  function jumpToStep(event) {
    event.preventDefault();
    const jumpStep = event.target.value;
    if (jumpStep < steps.length) {
      console.log(jumpStep);
      setCurrentStep(jumpStep);
    } else {
      return;
    }
  }

  return (
    <>
      <Headline>{name}</Headline>

      {currentStep === 0 ? (
        <TutorialStartCard />
      ) : currentStep < steps.length ? (
        <TutorialCard
          step={steps[currentStep]}
          totalSteps={steps.length - 1}
          jumpToStep={jumpToStep}
        />
      ) : (
        <TutorialEndCard />
      )}

      <ButtonContainer>
        {currentStep === 0 ? (
          <Link href="/tutorials" passHref>
            <Button isPrimary={false}>Back to library</Button>
          </Link>
        ) : (
          <Button isPrimary={false} onClick={() => subtractStep()}>
            {currentStep === 1 ? "Back to start" : "Prev"}
          </Button>
        )}
        {currentStep !== steps.length && (
          <Button isPrimary onClick={() => addStep()}>
            {currentStep === 0 ? "Start" : "Next"}
          </Button>
        )}
        {currentStep === steps.length && (
          <Link href="/tutorials" passHref>
            <Button isPrimary>Back to library</Button>
          </Link>
        )}
      </ButtonContainer>
    </>
  );
}
