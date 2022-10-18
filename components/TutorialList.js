import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function TutorialList({ tutorials }) {
  return (
    <ListContainer>
      {tutorials.map((tutorial) => {
        return (
          <ListItem key={tutorial.id}>
            <ListImage>
              <Image
                src={tutorial.cover}
                alt={tutorial.name}
                layout="fill"
                objectFit="cover"
              ></Image>
            </ListImage>
            <h2>{tutorial.name}</h2>
          </ListItem>
        );
      })}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  all: unset;
`;

const ListItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
`;

const ListImage = styled.figure`
  position: relative;
  aspect-ratio: 1;
  width: 5.625em;
  height: 5.625em;
`;
