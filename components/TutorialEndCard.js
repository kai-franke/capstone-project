import Link from "next/link";
import styled from "styled-components";
import { Button } from "./Buttons";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { Paragraph, Subline } from "./TextElements";

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
      <WhiteSubline>100%</WhiteSubline>
      <div ref={fireworks} />
      <WhiteSubline>Congratulations!</WhiteSubline>
      <WhiteParagraph>
        Someone has shared knowledge with you. <br />
        Why don&apos;t you share yours?
      </WhiteParagraph>
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

const WhiteSubline = styled(Subline)`
  color: var(--white);
  padding: 0 1em 1em 1em;
`;

const WhiteParagraph = styled(Paragraph)`
  color: var(--white);
  margin-bottom: 1.5em;
`;
