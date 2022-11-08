import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import styled from "styled-components";
import { Button } from "../components/Buttons";
import { Headline, Subline } from "../components/TextElements";
import TutorialList from "../components/TutorialList";
import { getTutorialByUser } from "../services/tutorialService";

const iconStyle = {
  color: "inherit",
  fontSize: "1.4em",
  marginRight: "0.5em",
};

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
      <Greeting>{`Welcome, ${userName}!`}</Greeting>
      <Link href="/create" passHref>
        <Button isPrimary>
          <TbPlus style={iconStyle} />
          Create tutorial
        </Button>
      </Link>
      <Headline>Your tutorials</Headline>
      {isLoading ? (
        <Message>Loading...</Message>
      ) : tutorials.length < 1 ? (
        <Message>You haven&apos;t created any tutorials yet</Message>
      ) : (
        <>
          <TutorialList tutorials={tutorials} />
          <SmallMessage>No more tutorials</SmallMessage>
        </>
      )}
    </>
  );
}
const Greeting = styled(Subline)`
  padding: 1em 0 1em 0;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1em;
  color: var(--lighttext);
  margin-top: 1.5em;
`;

const SmallMessage = styled(Message)`
  font-size: 0.7em;
`;
