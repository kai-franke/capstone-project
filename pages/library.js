import initialTutorials from "../db";
import TutorialList from "../components/TutorialList";

export default function LibraryPage() {
  return (
    <>
      <h1>My tutorials</h1>

      <TutorialList tutorials={initialTutorials} />
    </>
  );
}
