import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
export default function Login() {
  return (
    <>
      <Header />
      <Flex flexDir="column" maxW="1080" align="center" mt="10">
        <Heading>Faça seu login com a conta do Google</Heading>

        <Button mt="14" p="6" fontSize="18" onClick={() => signIn("google")}>
          <Icon as={AiFillGoogleCircle} boxSize={["6"]} mr="2" />
          Fazer login
        </Button>
      </Flex>

      <Footer pos="fixed" bottom="0" w="full" />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
