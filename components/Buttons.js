import styled from "styled-components";

const Button = styled.button`
  all: unset;
  min-width: 4em;
  border-radius: 8px;
  border: solid 2px;
  display: flex;
  justify-content: center;
  padding: 0.4em;
  background: var(
    ${({ isPrimary }) => (isPrimary ? "--primary-100" : "--background-pale")}
  );
  color: var(${({ isPrimary }) => (isPrimary ? "--white" : "--gray-70")});
  border-color: var(
    ${({ isPrimary }) => (isPrimary ? "--primary-100" : "--gray-70")}
  );

  &:hover {
    cursor: pointer;
    background: var(
      ${({ isPrimary }) => (isPrimary ? "--primary-90" : "--white")}
    );
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
`;

export { Button, ButtonContainer };
