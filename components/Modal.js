import styled from "styled-components";

export default function Modal({ children, click }) {
  return <ModalLayer onClick={click}>{children}</ModalLayer>;
}

const ModalLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  color: var(--primary-100);
  background-color: var(--background-opac-90);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;
