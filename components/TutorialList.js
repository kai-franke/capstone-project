import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import {
  TbTrash,
  TbChevronRight,
  TbCopy,
  TbMessage2Share,
  TbEye,
  TbEyeOff,
} from "react-icons/tb";
import { Paragraph, Subline } from "./TextElements";
import { useState } from "react";
import Modal from "./Modal";
import {
  Button,
  ButtonContainer,
  leftIconStyle,
} from "./Buttons";

const iconStyle = {
  color: "var(--primary-100)",
  fontSize: "1.3em",
  alignSelf: "end",
  justifySelf: "end",
};

export default function TutorialList({
  tutorials,
  showDeleteIcon,
  deleteDialoge,
}) {
  const [copyUrl, setCopyUrl] = useState("");

  function deleteHandler(event, id) {
    event.stopPropagation();
    deleteDialoge(id);
  }

  function copyHandler(event, slug) {
    event.stopPropagation();
    setCopyUrl(`https://tutorial-maker.vercel.app/tutorials/${slug}`);
  }

  return (
    <>
      {copyUrl !== "" && (
        <Modal click={() => setCopyUrl("")}>
          <TbMessage2Share style={{ fontSize: "1.5em" }} />
          <CopyText>
            This is the URL of this tutorial. <br />
            Please copy it and send it by email or via a messenger of your
            choice if you want to share the tutorial with someone.
          </CopyText>
          <CopyUrl>{copyUrl}</CopyUrl>
          <ButtonContainer>
            <Button
              isPrimary
              onClick={() => navigator.clipboard.writeText(copyUrl)}
            >
              <TbCopy style={leftIconStyle} /> Copy
            </Button>
          </ButtonContainer>
        </Modal>
      )}
      <ListContainer>
        {tutorials.map((tutorial) => (
          <Link key={tutorial.id} href={`/tutorials/${tutorial.slug}`} passHref>
            <ListItem>
              <ListImage>
                <Image
                  src={tutorial.cover}
                  alt={tutorial.name}
                  layout="fill"
                  objectFit="cover"
                ></Image>
              </ListImage>
              <ListName>{tutorial.name}</ListName>
              {showDeleteIcon && (
                <ListDelete
                  onClick={(event) => deleteHandler(event, tutorial.id)}
                >
                  <TbTrash style={iconStyle} />
                </ListDelete>
              )}
              <ListCopy onClick={(event) => copyHandler(event, tutorial.slug)}>
                <TbCopy style={iconStyle} />
              </ListCopy>
              <ListPublic>
                {tutorial.public ? <TbEye style={iconStyle} /> : <TbEyeOff style={iconStyle} />}
              </ListPublic>
              <ListStart>
                <TbChevronRight style={iconStyle} />
              </ListStart>
            </ListItem>
          </Link>
        ))}
      </ListContainer>
    </>
  );
}

const ListItem = styled.li`
  background-color: var(--primary-50);
  padding: 0.7em;
  display: grid;
  column-gap: 0.7em;
  grid-template-columns: 5.625em 1fr 1.4em;
  box-shadow: var(--boxshadow-primary);
  transition: 300ms linear;

  &:hover {
    background-color: var(--primary-60);
    cursor: pointer;
  }
`;

const ListImage = styled.figure`
  grid-area: 1 / 1 / 4 / 2;
  position: relative;
  aspect-ratio: 1;
`;

const ListName = styled(Subline)`
  grid-area: 1 / 2 / 4 / 3;
  padding: 0.15em 0;
`;

const ListDelete = styled.button`
  all: unset;
  grid-area: 1 / 3 / 2 / 4;
  place-self: center end;
  padding: auto;
`;

const ListCopy = styled.button`
  all: unset;
  grid-area: 2 / 3 / 3 / 4;
  place-self: center end;
`;

const ListStart = styled.button`
  all: unset;
  grid-area: 3 / 3 / 4 / 4;
  place-self: center end;
  display: grid;
`;

const ListPublic = styled.button`
  all: unset;
  grid-area: 3 / 2 / 4 / 3;
  place-self: center end;
  display: grid;
`;

const ListContainer = styled.ul`
  padding: 1em 0;
  list-style: none;
  display: grid;
  gap: 1em;
`;

const CopyText = styled(Paragraph)`
  text-align: center;
  padding: 1em;
  max-width: 450px;
`;

const CopyUrl = styled(Paragraph)`
  background-color: var(--primary-60);
  color: var(--primary-100);
  margin: 1em;
  padding: 1em;
  max-width: 450px;
  font-weight: 400;
`;
