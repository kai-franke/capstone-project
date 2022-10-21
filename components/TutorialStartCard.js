import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function TutorialStartCard() {
  return (
    <CardContainer>
      <Image
        src="/assets/tutorial-start-card_animation_300x300.gif"
        alt="rocket animation"
        width={300}
        height={300}
      ></Image>
      <Subline>Let&apos;s get started!</Subline>
      <p>You&apos;re about to learn something new.</p>
      <p>That&apos;s awesome.</p>
      <StyledP>Have fun!</StyledP>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--primary-50);
  color: var(--primary-100);
  margin: 1em;
  padding: 2em 0.7em;
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
  font-weight: 500;
  margin: 1em auto;
`;
