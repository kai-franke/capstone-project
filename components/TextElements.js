import styled from "styled-components";

const Headline = styled.h1`
  font-weight: 500;
  font-size: 1.5em;
  padding: 1em 0 0 0;
`;

const Subline = styled.h2`
  font-weight: 500;
  font-size: 1.2em;
  line-height: 1.35em;
  color: var(--primary-100);
`;

const Paragraph = styled.p`
  font-size: 0.9em;
  line-height: 1.6em;
  font-weight: 300;
  color: var(--copytext);
  padding: 0.7em 0;
`;

export { Headline, Subline, Paragraph };
