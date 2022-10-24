import styled from "styled-components";

function CreateForm() {
  return (
    <>
      <FormContainer>
        <FormCard>
          <StyledLabel isPrimary>
            <LabelText>Tutorial title</LabelText>
            <StyledInput />
          </StyledLabel>
        </FormCard>
        <FormCard>
          <StyledLabel isPrimary={false}>
            <LabelText>Step title</LabelText>
            <StyledInput />
          </StyledLabel>
          <StyledLabel isPrimary={false}>
            <LabelText>Picture URL</LabelText>
            <StyledInput />
          </StyledLabel>
          <StyledLabel isPrimary={false}>
            <LabelText>Step description</LabelText>
            <StyledInput />
          </StyledLabel>
        </FormCard>
      </FormContainer>
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
  //column-gap: 0.7em;
  //grid-template-columns: 5.625em 1fr;
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
  padding: 0.3em 0;
`;

const StyledInput = styled.input`
  all: unset;
  border: 1px solid var(--gray-30);
  border-radius: 8px;
  padding: 0.4em;
`;
