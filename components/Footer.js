import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  TbBook2,
  TbPalette,
  TbCaravan,
  TbLogin,
  TbLogout,
} from "react-icons/tb";
import { IconContext } from "react-icons";
import { useSession, signOut, signIn } from "next-auth/react";

function Footer() {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  return (
    <footer>
      <NavBar>
        <Link href="/" passHref>
          <NavItem isActive={pathname === "/"}>
            <IconContext.Provider
              value={{
                color: "inherit",
                size: "2em",
                title: "arrow icon",
                style: { justifySelf: "center", alignSelf: "end" },
              }}
            >
              <TbCaravan />
            </IconContext.Provider>
            Home
          </NavItem>
        </Link>
        <Link href="/tutorials" passHref>
          <NavItem isActive={pathname === "/tutorials"}>
            <IconContext.Provider
              value={{
                color: "inherit",
                size: "2em",
                title: "arrow icon",
                style: { justifySelf: "center", alignSelf: "end" },
              }}
            >
              <TbBook2 />
            </IconContext.Provider>
            Library
          </NavItem>
        </Link>
        <Link href="/create" passHref>
          <NavItem isActive={pathname === "/create"}>
            <IconContext.Provider
              value={{
                color: "inherit",
                size: "2em",
                title: "arrow icon",
                style: { justifySelf: "center", alignSelf: "end" },
              }}
            >
              <TbPalette />
            </IconContext.Provider>
            Create
          </NavItem>
        </Link>

        <NavItem
          isActive={false}
          onClick={() => {
            if (session) {
              signOut({
                callbackUrl: "/",
              });
            } else {
              signIn();
            }
          }}
        >
          <IconContext.Provider
            value={{
              color: "inherit",
              size: "2em",
              title: "arrow icon",
              style: { justifySelf: "center", alignSelf: "end" },
            }}
          >
            {session ? <TbLogout /> : <TbLogin />}
          </IconContext.Provider>
          {session ? "Sign out" : "Sign In"}
        </NavItem>
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
  display: flex;
  flex-wrap: nowrap;
  z-index: 30;
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
  font-size: 0.7em;
  letter-spacing: 0.05em;
  transition: 300ms linear;
  display: grid;
  flex: 1;

  &:hover {
    cursor: pointer;
    background-color: ${({ isActive }) =>
      isActive ? "var(--primary-90)" : "var(--white)"};
    font-size: 0.75em;
  }
`;
