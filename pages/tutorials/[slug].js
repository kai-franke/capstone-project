import { Button, ButtonContainer } from "../../components/Buttons";
import Headline from "../../components/Headline";
import TutorialStartCard from "../../components/TutorialStartCard";
import {
  getAllTutorials,
  getTutorialBySlug,
} from "../../services/tutorialService";

export async function getStaticPaths() {
  const tutorials = await getAllTutorials();
  const slugs = tutorials.map((tutorial) => tutorial.slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const tutorial = await getTutorialBySlug(slug);

  return {
    props: {
      name: tutorial.name,
      steps: tutorial.steps,
      id: tutorial.id,
      slug: slug,
    },
  };
}

export default function Tutorial({ name, steps, id, slug }) {
  return (
    <>
      <Headline>{name}</Headline>
      <TutorialStartCard />
      <ButtonContainer>
        <Button isPrimary={true}>Start</Button>
      </ButtonContainer>
    </>
  );
}
