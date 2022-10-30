import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TbCheck, TbPlus } from "react-icons/tb";
import { nanoid, customAlphabet } from "nanoid";
import { Button, ButtonContainer } from "./Buttons";

const slugSuffix = customAlphabet(
  "23456789abcdefghklmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ",
  4
);

function sanitizeString(dirtyString) {
  return dirtyString.trimStart().replace("  ", " ");
  // Thank you, https://github.com/Roland-Hufnagel and Felix!
}

function addProxyToImgUrl(prevUrl) {
  return `https://res.cloudinary.com/kaifranke/image/fetch/${prevUrl}`;
}

function CreateForm() {
  const [inputSteps, setInputSteps] = useState([
    { step: 1, title: "", img: "", description: "" },
  ]);
  const [inputTutorialTitle, setInputTutorialTitle] = useState("");

  const router = useRouter();
  const buttonRef = useRef();

  async function addNewTutorial(data) {
    try {
      const response = await fetch("/api/tutorials", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  function handleTitleChange(event) {
    const titleInput = event.target.value;
    const sanitizedTitleInput = sanitizeString(titleInput);
    setInputTutorialTitle(sanitizedTitleInput);
  }

  function handleFormChange(index, event) {
    const stepsInput = event.target.value;
    const sanitizedInput = sanitizeString(stepsInput);
    const data = [...inputSteps];
    data[index][event.target.name] = sanitizedInput;
    setInputSteps(data);
  }

  function handleAddStep() {
    const additionalStep = {
      step: inputSteps.length + 1,
      title: "",
      img: "",
      description: "",
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
    const stepsWithModifiedUrls = inputSteps.map((inputStep) => {
      return {
        ...inputStep,
        img: addProxyToImgUrl(inputStep.img),
      };
    });
    console.log(stepsWithModifiedUrls);

    const newTutorial = {
      id: nanoid(),
      name: inputTutorialTitle,
      cover: stepsWithModifiedUrls[inputSteps.length - 1]["img"],
      slug: inputTutorialTitle
        .toLowerCase()
        .replace(/[ ]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .concat("-", slugSuffix()),
      steps: [{ step: 0 }, ...stepsWithModifiedUrls],
    };

    addNewTutorial(newTutorial);

    router.push("/tutorials");
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
                  name="title"
                  value={step.title}
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
                  name="img"
                  value={step.img.trim()}
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
                  name="description"
                  value={step.description}
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
