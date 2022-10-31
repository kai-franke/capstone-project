import Image from "next/image";
import styled from "styled-components";

export default function TutorialCard({ step }) {
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
        <StepNumber>Step {step.step}</StepNumber>
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  background-color: var(--white);
  color: var(--primary-100);
  margin: 1em;
  padding: 1em 0.7em;
  text-align: left;
  box-shadow: var(--boxshadow-primary);
`;

const StepTitle = styled.h2`
  color: var(--darktext);
  font-weight: 500;
  font-size: 1.2em;
`;

const StepNumber = styled.p`
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
`;

const StepDescription = styled.p`
  font-size: 0.9em;
  line-height: 1.6em;
  font-weight: 300;
  color: var(--copytext);
  padding: 0.7em 0;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  width: 360px;
`;