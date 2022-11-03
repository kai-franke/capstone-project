import { Button } from "../components/Buttons";
import { signIn, signOut, useSession } from "next-auth/react";
import { TbBook2, TbLockOpen } from "react-icons/tb";
import styled from "styled-components";
import Link from "next/link";
import Headline from "../components/Headline";

export default function SigninPage() {
  const { data: session } = useSession();

  return (
    <>
      <Headline>Authentication</Headline>
      <PageContainer>
        {session ? (
          <>
            <p>Signed in as {session.user.email}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            <p>Please sign in</p>
            <Button isPrimary onClick={() => signIn()}>
              Sign in
              <TbLockOpen
                style={{
                  color: "inherit",
                  fontSize: "1.4em",
                  marginLeft: "0.5em",
                }}
              />
            </Button>
          </>
        )}
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  width: 100%;
  gap: 0.5em;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: start;
  position: absolute;
  top: 40%;
`;
