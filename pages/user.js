import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Headline, Subline } from "../components/TextElements";
import TutorialList from "../components/TutorialList";
import { getTutorialByUser } from "../services/tutorialService";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }

  const userTutorials = await getTutorialByUser(session.user.email);

  return {
    props: {
      userTutorials: userTutorials,
      userName: session.user.name,
    },
  };
}

export default function TutorialsPage({ userTutorials, userName }) {
  const [tutorials, setTutorials] = useState(userTutorials);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Subline>{`Welcome, ${userName}!`}</Subline>
      <Headline>Your tutorials</Headline>
      {isLoading ? (
        <Message>Loading...</Message>
      ) : tutorials.length < 1 ? (
        <Message>You haven&apos;t created any tutorials yet</Message>
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
