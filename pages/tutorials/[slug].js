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
      <h1>{name}</h1>
      <p>id: {id}</p>
      <p>slug: {slug}</p>
    </>
  );
}
