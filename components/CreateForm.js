import { useState, useRef } from "react";
import styled from "styled-components";
import { Button, ButtonContainer } from "./Buttons";

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
      <FormContainer>
        <FormCard>
          <StyledLabel isPrimary>
            <LabelText>Tutorial title</LabelText>
            <StyledInput
              placeholder="e.g. Repair a faucet"
              aria-placeholder="e.g. Repair a faucet"
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
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Picture URL</LabelText>
                <StyledInput
                  placeholder="https://www..."
                  aria-placeholder="https://www..."
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Step description</LabelText>
                <StyledTextarea
                  placeholder="Enter a description"
                  aria-placeholder="Enter a description"
                />
              </StyledLabel>
            </FormCard>
          );
        })}
      </FormContainer>
      <ButtonContainer>
        <Button ref={buttonRef} isPrimary onClick={handleAddStep}>
          Add step
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
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
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
