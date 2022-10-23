import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <footer>
      <NavBar>
        <Link href="/tutorials" passHref>
          <NavItem isActive={router.pathname === "/tutorials"}>Library</NavItem>
        </Link>
      </NavBar>
    </footer>
  );
}

export default Footer;

const NavBar = styled.nav`
  background-color: white;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 4em;
  position: fixed;
  bottom: 0;
  display: grid;
  justify-content: center;
`;

const NavItem = styled.a`
  border: solid var(--gray-10);
  border-width: 0 1px;
  width: 100vw;
  min-width: 5em;
  padding: 0.5em;
  background-color: ${({ isActive }) =>
    isActive ? "var(--primary-100)" : "var(--background-pale)"};
  color: ${({ isActive }) => (isActive ? "var(--white)" : "var(--gray-70)")};
  text-align: center;
  text-decoration: none;
  transition: 300ms linear;

  &:hover {
    cursor: pointer;
    background-color: ${({ isActive }) =>
      isActive ? "var(--primary-90)" : "var(--white)"};
  }
`;
