import dbConnect from "../lib/dbConnect";
import Tutorial from "../models/Tutorial";

export async function getAllTutorials() {
  await dbConnect();

  const tutorials = await Tutorial.find();

  const sanitizedTutorials = tutorials.map((tutorial) => ({
    id: tutorial._id.valueOf(),
    name: tutorial.name,
    cover: tutorial.cover,
    slug: tutorial.slug,
    steps: tutorial.steps,
    author: tutorial.author,
  }));

  return sanitizedTutorials;
}

export async function getTutorialBySlug(slug) {
  await dbConnect();
  const tutorials = await Tutorial.find();
  const tutorial = tutorials.find((tutorial) => tutorial.slug === slug);

  const sanitizedTutorial = {
    id: tutorial._id.valueOf(),
    name: tutorial.name,
    cover: tutorial.cover,
    slug: tutorial.slug,
    steps: tutorial.steps,
    author: tutorial.author,
  };
  return sanitizedTutorial;
}
