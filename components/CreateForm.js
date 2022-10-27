import { useState, useRef } from "react";
import styled from "styled-components";
import { Button, ButtonContainer } from "./Buttons";
import { TbCheck, TbPlus } from "react-icons/tb";
import { nanoid, customAlphabet } from "nanoid";

const slugSuffix = customAlphabet(
  "23456789abcdefghklmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ",
  4
);

function CreateForm() {
  const buttonRef = useRef();
  const [inputSteps, setInputSteps] = useState([
    { step: 1, stepTitle: "", stepUrl: "", stepDescription: "" },
  ]);
  const [inputTutorialTitle, setInputTutorialTitle] = useState("");

  function handleTitleChange(event) {
    let titleInput = event.target.value;
    // Thank you, https://github.com/Roland-Hufnagel
    titleInput = titleInput.startsWith(" ")
      ? titleInput.replace(" ", "")
      : titleInput.includes("  ")
      ? titleInput.replace("  ", " ")
      : titleInput;
    setInputTutorialTitle(titleInput);
  }

  function handleFormChange(index, event) {
    const data = [...inputSteps];
    if (event.target.value.trim() === "") {
      data[index][event.target.name] = "";
    } else if (event.target.value[0] === " ") {
      data[index][event.target.name] = event.target.value.trim();
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setInputSteps(data);
  }

  function handleAddStep() {
    const additionalStep = {
      step: inputSteps.length + 1,
      stepTitle: "",
      stepUrl: "",
      stepDescription: "",
    };
    setInputSteps((prevInputSteps) => [...prevInputSteps, additionalStep]);
    scrollToButton();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputTutorialTitle.replace(/[^a-zA-Z0-9]/g, "").length < 5) {
      alert(
        "The tutorial title must not consist of less than five letters and numbers (a-Z, 0-9, no special characters)."
      );
      return;
    }
    const newTutorial = {
      id: nanoid(),
      name: inputTutorialTitle,
      cover: inputSteps[inputSteps.length - 1]["stepUrl"],
      slug: inputTutorialTitle
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[-]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .concat("-", slugSuffix()),
      steps: [...inputSteps],
    };
  }

  function scrollToButton() {
    setTimeout(() => {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      <FormContainer id="tutorialForm" onSubmit={handleSubmit}>
        <FormCard>
          <StyledLabel isPrimary>
            <LabelText>Tutorial title</LabelText>
            <StyledInput
              name="tutorialTitle"
              placeholder="e.g. Repair a faucet"
              aria-placeholder="e.g. Repair a faucet"
              minLength="5"
              maxLength="60"
              required
              onChange={(event) => handleTitleChange(event)}
              value={inputTutorialTitle}
            />
          </StyledLabel>
        </FormCard>

        {inputSteps.map((step, index) => {
          return (
            <FormCard key={index.toString()}>
              <StepNumber>Step {index + 1}</StepNumber>
              <StyledLabel isPrimary={false}>
                <LabelText>Step title</LabelText>
                <StyledInput
                  name="stepTitle"
                  value={step.stepTitle}
                  placeholder="e.g. Prepare your tools"
                  aria-placeholder="e.g. Prepare your tools"
                  maxLength="60"
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Picture URL</LabelText>
                <StyledInput
                  name="stepUrl"
                  value={step.stepUrl.trim()}
                  type="text"
                  placeholder="https://www..."
                  aria-placeholder="https://www..."
                  pattern="(http)?s?:?(\/\/[^']*\.(?:gif|jpg|jpeg|jfif|pjpeg|pjp|png|webp))"
                  title="Valid format: 'https://www.yourdomain.com/image.jpg'"
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
              </StyledLabel>
              <StyledLabel isPrimary={false}>
                <LabelText>Step description</LabelText>
                <StyledTextarea
                  name="stepDescription"
                  value={step.stepDescription}
                  placeholder="Enter a description"
                  aria-placeholder="Enter a description"
                  maxLength="300"
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
              </StyledLabel>
            </FormCard>
          );
        })}
      </FormContainer>
      <ButtonContainer>
        <Button ref={buttonRef} isPrimary onClick={handleAddStep}>
          <TbPlus
            style={{
              color: "inherit",
              fontSize: "1.4em",
              marginRight: "0.5em",
            }}
          />
          add step
        </Button>
        <Button isPrimary type="submit" form="tutorialForm">
          finish creating
          <TbCheck
            style={{ color: "inherit", fontSize: "1.4em", marginLeft: "0.5em" }}
          />
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
  margin-bottom: 0.7em;

  &::placeholder {
    color: var(--gray-30);
  }

  &:invalid {
    border-color: var(--primary-100);
  }
`;

const StyledTextarea = styled.textarea`
  all: unset;
  border: 1px solid var(--gray-30);
  border-radius: 8px;
  padding: 0.4em;
  height: 4.5em;
  margin-bottom: 0.7em;

  &::placeholder {
    color: var(--gray-30);
  }

  &:invalid {
    border-color: var(--primary-100);
  }
`;

const StepNumber = styled.p`
  font-weight: 500;
  padding: 0.7em 0 0.3em 0;
  color: var(--primary-100);
`;
