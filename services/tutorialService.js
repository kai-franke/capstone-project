import dbConnect from "../lib/dbConnect";
import Tutorial from "../models/Tutorial";

export async function getAllTutorials() {
  await dbConnect();

  const tutorials = await Tutorial.find();

  const sanitizedTutorials = tutorials.map((tutorial) => ({
    id: tutorial.id,
    name: tutorial.name,
    cover: tutorial.cover,
    slug: tutorial.slug,
    steps: tutorial.steps,
  }));

  return sanitizedTutorials;
}

export async function getTutorialBySlug(slug) {
  await dbConnect();
  const tutorials = await Tutorial.find();
  const tutorial = tutorials.find((tutorial) => tutorial.slug === slug);

  const sanitizedTutorial = {
    id: tutorial.id,
    name: tutorial.name,
    cover: tutorial.cover,
    slug: tutorial.slug,
    steps: tutorial.steps,
  };

  return sanitizedTutorial;
}

