import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { TbBook2 } from "react-icons/tb";
import { IconContext } from "react-icons";

function Footer() {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <footer>
      <NavBar>
        <Link href="/tutorials" passHref>
          <NavItem isActive={router.pathname === "/tutorials"}>
            <IconContext.Provider
              value={{
                color: "inherit",
                size: "2em",
                title: "arrow icon",
                style: { justifySelf: "center" },
              }}
            >
              <TbBook2 />
            </IconContext.Provider>
            Library
          </NavItem>
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
  height: 3.5em;
  position: fixed;
  bottom: 0;
  display: grid;
`;

const NavItem = styled.a`
  border: solid var(--gray-10);
  border-width: 0 1px;
  min-width: 5em;
  padding: 0.5em 1em;
  background-color: ${({ isActive }) =>
    isActive ? "var(--primary-100)" : "var(--background-pale)"};
  color: ${({ isActive }) => (isActive ? "var(--white)" : "var(--gray-70)")};
  text-align: center;
  text-decoration: none;
  transition: 300ms linear;
  font-size: 0.7em;
  letter-spacing: 1px;
  display: grid;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ isActive }) =>
      isActive ? "var(--primary-90)" : "var(--white)"};
  }
`;
