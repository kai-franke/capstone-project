import styled from "styled-components";

export default function Modal({ children, click }) {
  return <ModalLayer onClick={click}>{children}</ModalLayer>;
}

const ModalLayer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--background-opac-90);
  z-index: 10;
  color: var(--primary-100);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;
