import dbConnect from "../../../lib/dbConnect";
import Tutorial from "../../../models/Tutorial";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );
  const { id } = request.query;

  if (request.method === "DELETE") {
    if (session) {
      await dbConnect();
      await Tutorial.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Tutorial deleted", deletedId: id });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else if (request.method === "PUT") {
    if (session) {
      await dbConnect();
      const data = JSON.parse(request.body);
      const updatedTutorial = await Tutorial.findByIdAndUpdate(id, data);
      return response
        .json(200)
        .json({
          message: "Tutorial updated",
          updatedTutorial: updatedTutorial,
        });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return response.status(405).json({ message: "HTTP method is not allowed" });
  }
}
