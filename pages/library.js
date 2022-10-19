import initialTutorials from "../db";
import TutorialList from "../components/TutorialList";
import styled from "styled-components";

export default function LibraryPage() {
  return (
    <>
      <Headline>My tutorials</Headline>
      <TutorialList tutorials={initialTutorials} />
      <Message>No more tutorials</Message>
    </>
  );
}

const Headline = styled.h1`
 font-weight: 500;
 font-size: 1.5em;
 padding: 1em 1em 0 1em;
 //margin: 0 0.5em;
`

const Message = styled.p`
text-align: center;
font-size: 0.7em;
color: var(--lighttext);
`