import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { TbCheck, TbPlus, TbTrash, TbX } from "react-icons/tb";
import styled from "styled-components";
import { Button } from "../components/Buttons";
import Modal from "../components/modals/Modal";
import { Headline, Paragraph, Subline } from "../components/TextElements";
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
  const [showModal, setShowModal] = useState(true);

  function modalButton() {
    setShowModal(true);
    console.log("button!");
  }

  function closeModal() {
    setShowModal(false);
  }

  function deleteTest(event) {
    //event.stopPropagation();
    console.log("delete!");
  }

  return (
    <>
      {showModal && (
        <Modal click={closeModal} deleteHandler={(event) => deleteTest(event)}>
          <TbTrash style={{ fontSize: "1.5em" }} />
          <Paragraph>Do you really want to delete this tutorial?</Paragraph>
          <Button isPrimary>
            <TbX style={iconStyle} /> no, cancel
          </Button>
          <Button onClick={deleteTest}>
            <TbCheck style={iconStyle} /> yes, delete
          </Button>
        </Modal>
      )}
      <Button onClick={modalButton}>MODAL</Button>
      <Greeting>{`Welcome, ${userName}!`}</Greeting>
      <Link href="/create" passHref>
        <Button isPrimary>
          <TbPlus style={iconStyle} />
          Create tutorial
        </Button>
      </Link>
      <Headline>Your tutorials</Headline>
      {userTutorials.length < 1 ? (
        <Message>You haven&apos;t created any tutorials yet</Message>
      ) : (
        <>
          <TutorialList tutorials={userTutorials} showDelete />
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
