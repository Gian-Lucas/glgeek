import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Favorites() {
  return (
    <>
      <Header />
      <Heading>Favoritos</Heading>
      <Footer />
      {/* <Footer pos="fixed" bottom="0" w="full" /> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
