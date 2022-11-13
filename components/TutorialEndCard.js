import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "./Buttons";

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
  padding: 2em 0.7em 3em 0.7em;
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
