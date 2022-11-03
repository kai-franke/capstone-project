import CreateForm from "../components/CreateForm";
import Headline from "../components/Headline";
import { getSession } from "next-auth/react";

export default function CreatePage({ session }) {
  return (
    <>
      <Headline>Create a new tutorial</Headline>
      <CreateForm />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
