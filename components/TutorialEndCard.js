import Link from "next/link";
import styled from "styled-components";
import { Button } from "./Buttons";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

export default function TutorialEndCard() {
  const fireworks = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: fireworks.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("/public/assets/tutorial-end-card_animation.json"),
    });
    return () => Lottie.destroy();
  }, []);

  return (
    <CardContainer>
      <Subline>100%</Subline>
      <div ref={fireworks} />
      <Subline>Congratulations!</Subline>
      <StyledP>
        Someone has shared knowledge with you. <br />
        Why don&apos;t you share yours?
      </StyledP>
      <Link href="/create" passHref>
        <Button>Create a tutorial</Button>
      </Link>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--primary-100);
  color: var(--white);
  margin: 1em auto;
  padding: 2em 0.7em 2em 0.7em;
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
  font-weight: 300;
  margin-bottom: 1.5em;
`;
