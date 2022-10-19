import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { IconContext } from "react-icons";

export default function TutorialList({ tutorials }) {
  return (
    <ListContainer>
      {tutorials.map((tutorial) => (
        <ListItem key={tutorial.id}>
          <ListImage>
            <Image
              src={tutorial.cover}
              alt={tutorial.name}
              layout="fill"
              objectFit="cover"
            ></Image>
          </ListImage>
          <ListName>{tutorial.name}</ListName>
          <IconContext.Provider value={{ color: `red` }}>
            <SlArrowRight />
          </IconContext.Provider>
        </ListItem>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  padding: 1em;
  list-style: none;
  display: grid;
  gap: 1em;
`;

const ListItem = styled.li`
  background-color: var(--primary-50);
  padding: 0.7em;
  display: grid;
  gap: 0.7em;
  grid-template-columns: 5.625em 1fr;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
`;

const ListImage = styled.figure`
  position: relative;
  aspect-ratio: 1;
  width: 5.625em;
`;

const ListName = styled.h2`
  font-weight: 500;
  font-size: 1.2em;
  line-height: 1.35em;
  color: var(--primary-100);
  padding: 0.15em 0;
`;
