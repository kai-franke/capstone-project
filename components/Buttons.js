import styled from "styled-components";

const Button = styled.button`
  all: unset;
  min-width: 4em;
  border-radius: 8px;
  border: solid 2px;
  display: flex;
  justify-content: center;
  padding: 0.4em 1em;
  background-color: ${({ isPrimary }) =>
    isPrimary ? "var(--primary-100)" : "var(--background-pale)"};
  border-color: ${({ isPrimary }) =>
    isPrimary ? "var(--primary-100)" : "var(--gray-70)"};
  color: ${({ isPrimary }) => (isPrimary ? "var(--white)" : "var(--gray-70)")};
  transition: 300ms linear;

  &:hover {
    cursor: pointer;
    background-color: ${({ isPrimary }) =>
      isPrimary ? "var(--primary-90)" : "var(--white)"};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-bottom: 4.5em;
`;

export { Button, ButtonContainer };
