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
    },
  };
}

export default function TutorialsPage({ userTutorials }) {
  const [tutorials, setTutorials] = useState(userTutorials);
  const [isLoading, setLoading] = useState(false);

  const { data: session } = useSession();
  console.log('session', session.user.name)


  return (
    <>
      <Subline>{`Welcome, ${session.user.name}!`}</Subline>
      <Headline>Your tutorials</Headline>
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
