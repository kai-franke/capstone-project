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
import { useSession, signOut, signIn } from "next-auth/react";

function Footer() {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const iconStyle = {
    color: "inherit",
    fontSize: "2em",
    justifySelf: "center",
    alignSelf: "end",
  };

  return (
    <footer>
      <NavBar>
        <Link href="/" passHref>
          <NavItem isActive={pathname === "/"}>
            <TbCaravan style={iconStyle} />
            Home
          </NavItem>
        </Link>
        <Link href="/tutorials" passHref>
          <NavItem isActive={pathname === "/tutorials"}>
            <TbBook2 style={iconStyle} />
            Library
          </NavItem>
        </Link>

        <Link href="/create" passHref>
          <NavItem isActive={pathname === "/create"}>
            <TbPalette style={iconStyle} />
            Create
          </NavItem>
        </Link>
        {session ? (
          <NavItem
            isActive={false}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <TbLogout style={iconStyle} />
            Sign out
          </NavItem>
        ) : (
          <NavItem isActive={false} onClick={() => signIn()}>
            <TbLogin style={iconStyle} />
            Sign in
          </NavItem>
        )}
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
