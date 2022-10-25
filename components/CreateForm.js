import { useState, useRef } from "react";
import styled from "styled-components";
import { Button, ButtonContainer } from "./Buttons";
import { TbCheck, TbPlus } from "react-icons/tb";
import { IconContext } from "react-icons";

function CreateForm() {
  const [steps, setSteps] = useState(1);
  const buttonRef = useRef();

  function scrollToButton() {
    setTimeout(() => {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  function handleAddStep() {
    setSteps((prevSteps) => prevSteps + 1);
    scrollToButton();
  }

  return (
    <>
      <FormContainer id="tutorialForm">
        <FormCard>
          <StyledLabel isPrimary>
            <LabelText>Tutorial title</LabelText>
            <StyledInput
              placeholder="e.g. Repair a faucet"
              aria-placeholder="e.g. Repair a faucet"
              minLength="5"
              maxLength="60"
              required
            />
          </StyledLabel>
        </FormCard>
        {[...Array(steps)].map((step, index) => {
          return (
            <FormCard key={index.toString()}>
              <StepNumber>Step {index + 1}</StepNumber>
              <StyledLabel isPrimary={false}>
                <LabelText>Step title</LabelText>
                <StyledInput
                  placeholder="e.g. Prepare your tools"
                  aria-placeholder="e.g. Prepare your tools"
                  maxLength="60"
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Picture URL</LabelText>
                <StyledInput
                  placeholder="https://www..."
                  aria-placeholder="https://www..."
                  type="url"
                  pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.gif|.jpg|.jpeg|.jfif|.pjpeg|.pjp|.png|.webp)"
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Step description</LabelText>
                <StyledTextarea
                  placeholder="Enter a description"
                  aria-placeholder="Enter a description"
                  maxLength="300"
                />
              </StyledLabel>
            </FormCard>
          );
        })}
      </FormContainer>
      <ButtonContainer>
        <Button ref={buttonRef} isPrimary onClick={handleAddStep}>
          <IconContext.Provider
            value={{
              color: "inherit",
              size: "1.4em",
              title: "checkmark icon",
              style: { marginRight: "0.5em" },
            }}
          >
            <TbPlus />
          </IconContext.Provider>
          Add step
        </Button>
        <Button isPrimary form="tutorialForm">
          finish creating
          <IconContext.Provider
            value={{
              color: "inherit",
              size: "1.4em",
              title: "checkmark icon",
              style: { marginLeft: "0.5em" },
            }}
          >
            <TbCheck />
          </IconContext.Provider>
        </Button>
      </ButtonContainer>
    </>
  );
}

export default CreateForm;

const FormContainer = styled.form`
  padding: 1em;
  list-style: none;
  display: grid;
  gap: 1em;
`;

const FormCard = styled.fieldset`
  all: unset;
  background-color: var(--white);
  padding: 0.7em;
  display: grid;
  box-shadow: var(--boxshadow-primary);
  transition: 300ms linear;
`;

const StyledLabel = styled.label`
  display: grid;
  color: ${({ isPrimary }) =>
    isPrimary ? "var(--primary-100)" : "var(--darktext)"};
`;

const LabelText = styled.span`
  font-weight: 500;
  padding: 0.3em 0;
`;

const StyledInput = styled.input`
  all: unset;
  border: 1px solid var(--gray-30);
  border-radius: 8px;
  padding: 0.4em;

  &::placeholder {
    color: var(--gray-30);
  }
`;

const StyledTextarea = styled.textarea`
  all: unset;
  border: 1px solid var(--gray-30);
  border-radius: 8px;
  padding: 0.4em;
  height: 4.5em;

  &::placeholder {
    color: var(--gray-30);
  }
`;

const StepNumber = styled.p`
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
  color: var(--primary-100);
`;
