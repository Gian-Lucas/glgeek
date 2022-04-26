import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useEffect } from "react";

export default function Component() {
  const { "0": session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn("google")}>Sign in</Button>
    </>
  );
}
