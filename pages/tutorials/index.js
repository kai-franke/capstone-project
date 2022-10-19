import styled from "styled-components";
import TutorialList from "../../components/TutorialList";
import { getAllTutorials } from "../../services/tutorialService";

export async function getStaticProps(context) {
  const tutorials = await getAllTutorials();

  return {
    props: { tutorials: tutorials },
  };
}

export default function TutorialsPage({ tutorials }) {
  return (
    <>
      <Headline>My tutorials</Headline>
      <TutorialList tutorials={tutorials} />
      <Message>No more tutorials</Message>
    </>
  );
}

const Headline = styled.h1`
  font-weight: 500;
  font-size: 1.5em;
  padding: 1em 1em 0 1em;
  //margin: 0 0.5em;
`;

const Message = styled.p`
  text-align: center;
  font-size: 0.7em;
  color: var(--lighttext);
`;
