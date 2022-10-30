import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [tutorials]);

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <Headline>My tutorials</Headline>
      <TutorialList tutorials={tutorials} />
      {isRefreshing ? (
        <Message>Loading tutorials...</Message>
      ) : (
        <Message>No more tutorials</Message>
      )}
    </>
  );
}

const Message = styled.p`
  text-align: center;
  font-size: 0.7em;
  color: var(--lighttext);
  margin-bottom: 7em;
`;
