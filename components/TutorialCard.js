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
            type="number"
            min="1"
            max={totalSteps}
            onChange={(event) => handleStepChange(event)}
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
`;

const StepText = styled.p`
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
`;

const CurrentStepNumber = styled.input`
  all: unset;
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
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
