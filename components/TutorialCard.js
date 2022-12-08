import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Paragraph, Subline } from "./TextElements";

export default function TutorialCard({ step, totalSteps, jumpToStep }) {
  const [stepNumberInput, setStepNumberInput] = useState(step.step);

  function handleStepChange(event) {
    const eventValue = event.target.value;
    if (eventValue === "" || (eventValue > 0 && eventValue <= totalSteps)) {
      setStepNumberInput(eventValue);
    }
  }

  console.log("stepNumberInput.length", stepNumberInput.length);
  console.log("step.step", step.step.toString().length);

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
          <StepText>Step&nbsp;</StepText>
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
            onBlur={(event) => jumpToStep(event)}
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
  padding: 0.3em 0 0.1em 0;
  margin: 0.67em 0.35em 0 1px;
  text-align: center;
  cursor: pointer;

  &:hover {
    border: 1px dashed var(--gray-30);
    margin: 0.6em 0.3em 0 0;
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
