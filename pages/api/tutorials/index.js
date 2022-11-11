import dbConnect from "../../../lib/dbConnect";
import Tutorial from "../../../models/Tutorial";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getAllTutorials } from "../../../services/tutorialService";

export default async function handler(request, response) {
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );

  if (request.method === "GET") {
    const tutorials = await getAllTutorials();
    return response.status(200).json(tutorials);
  } else if (request.method === "POST") {
    if (session) {
      await dbConnect();
      const postData = JSON.parse(request.body);
      const newTutorial = await Tutorial.create(postData);
      return response
        .status(201)
        .json({ message: "Tutorial created", createdSlug: newTutorial.slug });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  }

  return response.status(405).json({ message: "HTTP method is not allowed" });
}
