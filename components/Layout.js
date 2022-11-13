import styled from "styled-components";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
}

export default Layout;

const MainContainer = styled.main`
max-width: 600px;
margin: auto;
padding: 0 1em;
`