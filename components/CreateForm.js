import { useState, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  TbCheck,
  TbPlus,
  TbCameraOff,
  TbTrash,
  TbDirection,
  TbChevronUp,
} from "react-icons/tb";
import styled from "styled-components";
import { customAlphabet } from "nanoid";
import Lottie from "lottie-web";

import Modal from "./Modal";
import { Button, ButtonContainer } from "./Buttons";
import { Paragraph } from "./TextElements";

// Possible letters for random suffix when generating URL
const slugSuffix = customAlphabet(
  "23456789abcdefghklmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ",
  4
);

function sanitizeString(dirtyString) {
  return dirtyString.trimStart().replace("  ", " ");
  // Thank you, https://github.com/Roland-Hufnagel and Felix!
}

function renumberSteps(wrongNumberedSteps) {
  const correctNumberedSteps = wrongNumberedSteps.map(
    (wrongNumberedStep, index) => {
      return { ...wrongNumberedStep, step: index + 1 };
    }
  );
  return correctNumberedSteps;
}

export default function CreateForm() {
  const [inputSteps, setInputSteps] = useState([
    { step: 1, title: "", img: "", description: "", file: "" },
  ]);
  const [inputTutorialTitle, setInputTutorialTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonRef = useRef();
  const lottiefile = useRef(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    Lottie.loadAnimation({
      container: lottiefile.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("/public/assets/uploading_animation.json"),
    });
    return () => Lottie.destroy();
  }, [isLoading]);

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
    setIsLoading(false);
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

  function handleChangeStepAmount(start, deleteCount) {
    const data = inputSteps;
    const additionalStep = {
      step: start + 1,
      title: "",
      img: "",
      description: "",
      file: "",
    };
    if (deleteCount) {
      data.splice(start, deleteCount);
    } else {
      data.splice(start, deleteCount, additionalStep);
    }
    setInputSteps(renumberSteps(data));
    start === inputSteps.length - 1 ? scrollToButton() : scrollDown150Px();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    if (inputTutorialTitle.replace(/[^a-zA-Z0-9]/g, "").length < 5) {
      alert(
        "The tutorial title must not consist of less than five letters and numbers (a-Z, 0-9, no special characters)."
      );
      return;
    }

    setIsLoading(true);

    // Upload images to Cloudinary and set URL
    let index = 0;
    for (const file of inputSteps) {
      const updatedInputSteps = [...inputSteps];

      if (file.file) {
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
        updatedInputSteps[index]["img"] = data.secure_url;
      } else {
        updatedInputSteps[index]["img"] = "/assets/placeholder_image_01.jpg";
      }

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
      author: session.user.email,
      public: event.target.tutorialPublic.checked,
    };

    addNewTutorial(newTutorial);
  }

  function scrollToButton() {
    setTimeout(() => {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  function scrollDown150Px() {
    window.scrollBy({
      top: 150,
      behavior: "smooth",
    });
  }

  return (
    <>
      {isLoading && (
        <Modal>
          <LoadingAnimation ref={lottiefile} />
          <Paragraph>Uploading your images, please wait...</Paragraph>
        </Modal>
      )}

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
          <StyledLabel flex>
            <LabelText>Show tutorial in public library?</LabelText>
            <StyledCheckbox name="tutorialPublic" type="checkbox" />
          </StyledLabel>
        </FormCard>

        {inputSteps.map((step, index) => {
          return (
            <Fragment key={index}>
              <InsertButton
                type="button"
                onClick={() => handleChangeStepAmount(index, 0)}
              >
                {index === 0 ? (
                  <>
                    <TbChevronUp fontSize="1.5em" /> Add step before
                  </>
                ) : (
                  <>
                    <TbDirection fontSize="2em" /> Insert step
                  </>
                )}
              </InsertButton>

              <FormCard>
                <FlexWrapper>
                  <StepNumber>Step {index + 1}</StepNumber>
                  {inputSteps.length > 1 && (
                    <StepDelete
                      type="button"
                      onClick={() => handleChangeStepAmount(index, 1)}
                      aria-label="Delete step"
                    >
                      <TbTrash />
                    </StepDelete>
                  )}
                </FlexWrapper>
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
                    //required
                  ></UploadInputfield>
                  <LabelText>Step picture</LabelText>
                  <UploadButtonBorder>
                    <PreviewImage showBorder={inputSteps[index]["img"] === ""}>
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
                              marginBottom: "0.2em",
                            }}
                          />
                          No picture selected
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
            </Fragment>
          );
        })}
      </FormContainer>
      <ButtonContainer>
        <Button
          ref={buttonRef}
          isPrimary
          onClick={() => handleChangeStepAmount(inputSteps.length, 0)}
        >
          <TbPlus
            style={{
              color: "inherit",
              fontSize: "1.4em",
              marginRight: "0.5em",
            }}
          />
          Add step
        </Button>
        <Button isPrimary type="submit" form="tutorialForm">
          Finish creating
          <TbCheck
            style={{ color: "inherit", fontSize: "1.4em", marginLeft: "0.5em" }}
          />
        </Button>
      </ButtonContainer>
    </>
  );
}

const FormContainer = styled.form`
  margin: 1em auto;
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
  display: ${({ flex }) =>
    flex ? "flex" : "grid"};;
  color: ${({ isPrimary }) =>
    isPrimary ? "var(--primary-100)" : "var(--darktext)"};
  align-items: center;
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

const StyledCheckbox = styled.input`
  width: 1.15rem;
  height: 1.15rem;
  margin-left: 0.5rem;
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
  border: ${({ showBorder }) =>
    showBorder ? "2px dotted var(--gray-30)" : "none"};
  border-radius: 5px;
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
  color: var(--gray-70);
  text-align: center;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingAnimation = styled.div`
  height: 100px;
`;

const StepDelete = styled.button`
  all: unset;
  color: var(--gray-70);
  cursor: pointer;

  &:hover {
    color: var(--primary-100);
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InsertButton = styled.button`
  all: unset;
  padding-right: 0.6em;
  color: var(--gray-70);
  font-size: 0.8em;
  justify-self: center;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--primary-100);
  }
`;
