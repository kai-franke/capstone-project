import styled from "styled-components";
import Headline from "../../components/Headline";
import TutorialList from "../../components/TutorialList";
import { getAllTutorials } from "../../services/tutorialService";

export async function getServerSideProps(context) {
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

const Message = styled.p`
  text-align: center;
  font-size: 0.7em;
  color: var(--lighttext);
`;
