import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TbCheck, TbPlus, TbCameraOff } from "react-icons/tb";
import { customAlphabet } from "nanoid";
import { Button, ButtonContainer } from "./Buttons";
import Image from "next/image";

const slugSuffix = customAlphabet(
  "23456789abcdefghklmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ",
  4
);

function sanitizeString(dirtyString) {
  return dirtyString.trimStart().replace("  ", " ");
  // Thank you, https://github.com/Roland-Hufnagel and Felix!
}

function CreateForm() {
  const [inputSteps, setInputSteps] = useState([
    { step: 1, title: "", img: "", description: "", file: "" },
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
      router.push("/tutorials");
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

  function handleUploadChange(index, changeEvent) {
    const newFile = changeEvent.target.files[0];
    const data = [...inputSteps];
    data[index]["file"] = newFile;

    try {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        data[index]["img"] = onLoadEvent.target.result;
        setInputSteps(data);
      };
      reader.readAsDataURL(changeEvent.target.files[0]);
    } catch {
      data[index]["img"] = "";
      setInputSteps(data);
    }
  }

  function handleAddStep() {
    const additionalStep = {
      step: inputSteps.length + 1,
      title: "",
      img: "",
      description: "",
      file: "",
    };
    setInputSteps((prevInputSteps) => [...prevInputSteps, additionalStep]);
    scrollToButton();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputTutorialTitle.replace(/[^a-zA-Z0-9]/g, "").length < 5) {
      alert(
        "The tutorial title must not consist of less than five letters and numbers (a-Z, 0-9, no special characters)."
      );
      return;
    }

    // Upload images to Cloudinary and set URL
    let index = 0;
    for (const file of inputSteps) {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("upload_preset", "tutorial-img");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/kaifranke/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
      const updatedInputSteps = [...inputSteps];
      updatedInputSteps[index]["img"] = data.secure_url;
      setInputSteps(updatedInputSteps);
      index += 1;
    }

    // Compile and format tutorial data
    const newTutorial = {
      name: inputTutorialTitle,
      cover: inputSteps[inputSteps.length - 1]["img"],
      slug: inputTutorialTitle
        .toLowerCase()
        .replace(/[ ]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .concat("-", slugSuffix()),
      steps: [{ step: 0 }, ...inputSteps],
    };

    addNewTutorial(newTutorial);
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

              <UploadButton>
                <UploadInputfield
                  name="file"
                  type="file"
                  accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp"
                  onChange={(event) => handleUploadChange(index, event)}
                  required
                ></UploadInputfield>
                <LabelText>Step picture</LabelText>
                <UploadButtonBorder>
                  <PreviewImage>
                    {inputSteps[index]["img"] ? (
                      <Image
                        src={inputSteps[index]["img"]}
                        layout="fill"
                        objectFit="cover"
                        alt="Upload preview"
                      />
                    ) : (
                      <NoImage>
                        <TbCameraOff
                          style={{
                            color: "inherit",
                            fontSize: "1.5em",
                          }}
                        />
                        <br />
                        No image selected
                      </NoImage>
                    )}
                  </PreviewImage>
                  <PreviewFileName>
                    {inputSteps[index].file
                      ? inputSteps[index].file.name
                      : "Please select a picture"}
                  </PreviewFileName>
                </UploadButtonBorder>
              </UploadButton>
              <p
                style={{
                  fontSize: "0.75em",
                  marginBottom: "0.7em",
                  color: "var(--gray-70)",
                }}
              >
                Accepted file formats: .gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp,
                .png, .webp
              </p>

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
  margin-bottom: 1em;

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

const UploadButton = styled.label`
  color: var(--darktext);
  cursor: pointer;
`;

const UploadButtonBorder = styled.div`
  padding: 0.3em;
  margin: 0.5em 0;
  border-radius: 8px;
  border: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  gap: 0.4em;
`;

const PreviewImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 5em;
  aspect-ratio: 1;
  border-radius: 8px;
  background-color: var(--gray-70);
  display: grid;
  align-items: center;
`;

const PreviewFileName = styled.p`
  color: var(--gray-70);
`;

const UploadInputfield = styled.input`
  // Removes field's visibility but leaves its functionality to the label and screenreader ability
  width: 1px;
  height: 1px;
`;

const NoImage = styled.p`
  color: var(--white);
  text-align: center;
  font-size: 0.8em;
`;
