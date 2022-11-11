import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbCheck, TbPlus, TbTrash, TbX } from "react-icons/tb";
import styled from "styled-components";
import { Button, ButtonContainer } from "../components/Buttons";
import Modal from "../components/Modal";
import { Headline, Paragraph, Subline } from "../components/TextElements";
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
  const [showModal, setShowModal] = useState(false);
  const [tutorialToBeDeleted, setTutorialToBeDeleted] = useState("");
  const router = useRouter();

  function deleteDialoge(id) {
    setShowModal(true);
    setTutorialToBeDeleted(id);
  }

  async function deleteTutorial() {
    const response = await fetch(`/api/tutorials/${tutorialToBeDeleted}`, {
      method: "DELETE",
    });
    await response.json();
    router.push("/user");
  }

  return (
    <>
      {showModal && (
        <Modal click={() => setShowModal(false)}>
          <TbTrash style={{ fontSize: "1.5em" }} />
          <Paragraph>Do you really want to delete this tutorial?</Paragraph>
          <ButtonContainer>
            <Button isPrimary>
              <TbX style={leftIconStyle} /> No, cancel
            </Button>
            <Button onClick={deleteTutorial}>
              Yes, delete <TbCheck style={reftIconStyle} />
            </Button>
          </ButtonContainer>
        </Modal>
      )}

      <Greeting>{`Welcome, ${userName}!`}</Greeting>
      <Link href="/create" passHref>
        <Button isPrimary>
          <TbPlus style={leftIconStyle} />
          Create tutorial
        </Button>
      </Link>
      <Headline>Your tutorials</Headline>
      {userTutorials.length < 1 ? (
        <Message>You haven&apos;t created any tutorials yet</Message>
      ) : (
        <>
          <TutorialList
            tutorials={userTutorials}
            showDeleteIcon
            deleteDialoge={deleteDialoge}
          />
          <SmallMessage>No more tutorials</SmallMessage>
        </>
      )}
    </>
  );
}

const Greeting = styled(Subline)`
  padding: 1em 0;
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

const leftIconStyle = {
  color: "inherit",
  fontSize: "1.4em",
  marginRight: "0.3em",
};

const reftIconStyle = {
  color: "inherit",
  fontSize: "1.4em",
  marginLeft: "0.3em",
};
