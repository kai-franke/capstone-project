import Image from "next/image";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Lottie from "lottie-web";

export default function TutorialStartCard() {
  const lottiefile = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: lottiefile.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("/public/assets/tutorial-start-card_animation.json"),
    });
    return () => Lottie.destroy();
  }, []);

  return (
    <CardContainer>
      <Rocket ref={lottiefile} />
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
  margin: 1em auto;
  padding: 0 0.7em 2em 0.7em;
    text-align: center;
  display: grid;
  justify-items: center;
  box-shadow: var(--boxshadow-primary);
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

const Rocket = styled.div`
  height: 300px;
  //background-color: red;
`;
