import { useEffect, useState } from "react";
import styled from "styled-components";
import Headline from "../../components/Headline";
import TutorialList from "../../components/TutorialList";

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

  return (
    <>
      <Headline>My tutorials</Headline>
      {isLoading ? (
        <Message>Loading...</Message>
      ) : !tutorials ? (
        <Message>No tutorial data</Message>
      ) : (
        <>
          <TutorialList tutorials={tutorials} />
          <Message>No more tutorials</Message>
        </>
      )}
    </>
  );
}

const Message = styled.p`
  text-align: center;
  font-size: 0.7em;
  color: var(--lighttext);
  margin-top: 1.5em;
`;
