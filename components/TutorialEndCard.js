import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function TutorialEndCard() {
  return (
    <CardContainer>
      <Subline>100%</Subline>
      <Image
        src="/assets/tutorial-end-card_animation_300x300.gif"
        alt="rocket animation"
        width={300}
        height={300}
      ></Image>
      <Subline>Congratulations!</Subline>
      <StyledP>Someone has shared knowledge with you.</StyledP>
      <StyledP>Why don&apos;t you share yours?</StyledP>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--primary-100);
  color: var(--white);
  margin: 1em;
  padding: 2em 0.7em 3em 0.7em;
  text-align: center;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
`;

const Subline = styled.h2`
  font-weight: 500;
  font-size: 1.2em;
  padding: 1em;
`;

const StyledP = styled.p`
  font-weight: 300;
`;