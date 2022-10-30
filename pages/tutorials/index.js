import { useEffect, useState } from "react";
import styled from "styled-components";
import Headline from "../../components/Headline";
import TutorialList from "../../components/TutorialList";
//import { getAllTutorials } from "../../services/tutorialService";

/* export async function getServerSideProps(context) {
  const tutorials = await getAllTutorials();
  return {
    props: { tutorials: tutorials },
  };
} */

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/tutorials")
      .then((res) => res.json())
      .then((tutorials) => {
        setTutorials(tutorials);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <>
        <Headline>My tutorials</Headline>
        <Message>Loading...</Message>
      </>
    );
  if (!tutorials)
    return (
      <>
        <Headline>My tutorials</Headline>
        <Message>No tutorial data</Message>
      </>
    );

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
