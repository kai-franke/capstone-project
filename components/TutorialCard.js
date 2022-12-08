import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Paragraph, Subline } from "./TextElements";

export default function TutorialCard({ step, totalSteps, setCurrentStep }) {
  const [stepNumberInput, setStepNumberInput] = useState(step.step);

  function handleStepChange(event) {
    const eventValue = event.target.value;
    if (eventValue === "" || (eventValue > 0 && eventValue <= totalSteps)) {
      setStepNumberInput(eventValue);
    }
  }

  function handleKeyUp(event) {
    if (event.key === "Enter") {
      jumpToStep();
    }
  }

  function jumpToStep() {
    const jumpStep = stepNumberInput;
    if (stepNumberInput !== "") {
      setCurrentStep(jumpStep);
    } else {
      setStepNumberInput(step.step);
    }
  }

  useEffect(() => {
    setStepNumberInput(step.step);
  }, [step.step]);

  return (
    <>
      <CardContainer>
        <ImageContainer>
          <Image
            src={step.img}
            alt={step.title}
            layout="fill"
            objectFit="cover"
          ></Image>
        </ImageContainer>
        <StepNumber>
          <StepText>Step</StepText>
          <CurrentStepNumber
            value={stepNumberInput}
            type="text"
            inputMode="numeric"
            min="1"
            max={totalSteps}
            widthFactor={
              stepNumberInput.length
                ? stepNumberInput.length
                : step.step.toString().length
            }
            onInput={(event) => handleStepChange(event)}
            onBlur={() => jumpToStep()}
            onKeyUp={(event) => handleKeyUp(event)}
          />
          <TotalStepNumbers>of {totalSteps}</TotalStepNumbers>
        </StepNumber>
        <StepTitle>{step.title}</StepTitle>
        <Paragraph>{step.description}</Paragraph>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  background-color: var(--white);
  color: var(--primary-100);
  margin: 1em auto;
  padding: 1em 0.7em;
  text-align: left;
  box-shadow: var(--boxshadow-primary);
  max-width: 600px;
`;

const StepTitle = styled(Subline)`
  color: var(--darktext);
`;

const StepNumber = styled.div`
  display: flex;
  align-content: flex-start;
`;

const StepText = styled.p`
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
`;

const CurrentStepNumber = styled.input`
  all: unset;
  width: ${(props) => props.widthFactor * 0.85}em;
  height: 1em;
  font-weight: 500;
  padding: 0.25em 0 0.1em 0;
  margin: 0.67em 0.35em 0 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    border: 1px dashed var(--gray-30);
    margin: 0.62em 0.28em 0 3px;
  }
`;

const TotalStepNumbers = styled.p`
  color: var(--gray-30);
  font-weight: 300;
  padding: 0.7em 0 0.3em 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
`;
