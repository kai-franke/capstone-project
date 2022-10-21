import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function TutorialCard({ step }) {
  return (
    <>
      <CardContainer>
        <Image src={step.img} alt={step.title} width={350} height={350}></Image>
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
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
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
