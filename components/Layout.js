import styled from "styled-components";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
}

export default Layout;

const StyledMain = styled.main`
  //min-height: calc(100vh - 8rem);
`;
