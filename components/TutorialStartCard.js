import { useEffect, useRef } from "react";
import styled from "styled-components";
import Lottie from "lottie-web";
import { Paragraph, Subline } from "./TextElements";

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
      <StyledParagraph>
        You&apos;re about to learn something new.
        <br />
        That&apos;s awesome.
        <br />
        <span>Have fun!</span>
      </StyledParagraph>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--primary-50);
  color: var(--primary-100);
  margin: 1em auto;
  padding: 0 0.7em 1em 0.7em;
  text-align: center;
  display: grid;
  justify-items: center;
  box-shadow: var(--boxshadow-primary);
`;

const StyledParagraph = styled(Paragraph)`
  color: var(--primary-100);

  & span {
    font-weight: 500;
    font-size: 1.1em;
    line-height: 3;
  }
`;

const Rocket = styled.div`
  height: 300px;
`;
