import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { TbTrash, TbChevronRight } from "react-icons/tb";
import ListContainer from "./ListContainer";
import { Subline } from "./TextElements";

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
  function deleteHandler(event, id) {
    event.stopPropagation();
    deleteDialoge(id);
  }

  return (
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
            <ListStart>
              <TbChevronRight style={iconStyle} />
            </ListStart>
          </ListItem>
        </Link>
      ))}
    </ListContainer>
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
`;

const ListStart = styled.button`
  all: unset;
  grid-area: 3 / 3 / 4 / 4;
  place-self: center end;
`;
