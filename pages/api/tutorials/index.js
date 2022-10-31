import dbConnect from "../../../lib/dbConnect";
import Tutorial from "../../../models/Tutorial";
import { getAllTutorials } from "../../../services/tutorialService";

export default async function handler(request, response) {
  if (request.method === "GET") {
    const tutorials = await getAllTutorials();
    return response.status(200).json(tutorials);
  } else if (request.method === "POST") {
    await dbConnect();

    const postData = JSON.parse(request.body);
    const newTutorial = await Tutorial.create(postData);

    return response
      .status(201)
      .json({ message: "Tutorial created", createdSlug: newTutorial.slug });
  }

  return response.status(405).json({ message: "HTTP method is not allowed" });
}
