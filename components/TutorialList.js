import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IconContext } from "react-icons";
import ListContainer from "./ListContainer";
import { Subline } from "./TextElements";

export default function TutorialList({ tutorials }) {
  return (
    <ListContainer>
      {tutorials.map((tutorial) => (
        <Link key={tutorial.id} href={`/tutorials/${tutorial.slug}`}>
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
            <IconContext.Provider
              value={{
                color: "#19A7B0",
                size: "2em",
                title: "arrow icon",
                style: { alignSelf: "end", justifySelf: "end" },
              }}
            >
              <MdKeyboardArrowRight />
            </IconContext.Provider>
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
  grid-template-columns: 5.625em 1fr;
  box-shadow: var(--boxshadow-primary);
  transition: 300ms linear;

  &:hover {
    background-color: var(--primary-60);
    cursor: pointer;
  }
`;

const ListImage = styled.figure`
  grid-row: 1 / span 2;
  position: relative;
  aspect-ratio: 1;
`;

const ListName = styled(Subline)`
  padding: 0.15em 0;
`;
