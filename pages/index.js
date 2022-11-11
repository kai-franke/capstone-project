import Head from "next/head";
import Link from "next/link";
import { TbBook2, TbPalette } from "react-icons/tb";
import styled from "styled-components";
import { Button } from "../components/Buttons";
import { Paragraph, Subline, DarkSubline } from "../components/TextElements";

export default function Home() {
  const iconStyle = {
    color: "inherit",
    fontSize: "1.4em",
    marginRight: "0.5em",
  };

  return (
    <>
      <Head>
        <title>How to Bathe a Hamster – Your Tutorial Maker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoContainer>
        <h1>
          <object
            type="image/svg+xml"
            data="/assets/hamster logo v2.svg"
            aria-label="How to bathe a hamster – Your tutorial maker | logo"
          >
            How to Bathe a Hamster – Your Tutorial Maker | Logo
          </object>
        </h1>
      </LogoContainer>

      <StyledSection>
        <DarkSubline>All public tutorials</DarkSubline>
        <Paragraph>
          Browse the collection of all public tutorials in the library and
          choose what you would like to to learn.
        </Paragraph>
        <Link href="/tutorials" passHref>
          <Button isPrimary>
            <TbBook2 style={iconStyle} />
            Go to library
          </Button>
        </Link>
      </StyledSection>

      <StyledSection>
        <DarkSubline>Create your own tutorial</DarkSubline>
        <Paragraph>
          Create an illustrated step-by-step tutorial and share your knowledge
          and skills with family, friends or the rest of the world.
        </Paragraph>
        <Link href="/create" passHref>
          <Button isPrimary>
            <TbPalette style={iconStyle} />
            Create a tutorial
          </Button>
        </Link>
      </StyledSection>

      <About>
        <Subline>What is this all about?</Subline>
        <Paragraph>
          Being able to pass on knowledge was an important factor that made
          today&apos;s civilization possible. How to bathe a hamster should help
          you to learn from each other in an uncomplicated way. For this
          purpose, simple step-by-step instructions can be created and shared
          afterwards. You are invited to share your knowledge and learn
          yourself.
        </Paragraph>
      </About>
    </>
  );
}

const HomeButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20vh auto;
  align-items: center;
  gap: 1em;
`;

const LogoContainer = styled.div`
  max-width: 450px;
  margin: 3.5em auto 0 auto;
  padding: 0 2em;
`;

const StyledSection = styled.section`
  background-color: var(--primary-50);
  color: var(--darktext);
  margin: 1.5em auto;
  padding: 1.5em 1em;
  box-shadow: var(--boxshadow-primary);
  min-width: 320px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: flex-start;
`;

const About = styled(StyledSection)`
  background-color: var(--white);
`;
