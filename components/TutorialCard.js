import Image from "next/image";
import styled from "styled-components";
import { Paragraph } from "./TextElements";

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
        <Paragraph>{step.description}</Paragraph>
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
  max-width: 600px;
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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
`;