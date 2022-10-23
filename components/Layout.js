import styled from "styled-components";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
