import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { graphcms } from "../services/graphcms";

interface Post {
  id: string;
  description: string;
  updatedAt: string;
  slug: string;
  title: string;
  banner: {
    url: string;
  };
}

interface FavoritesProps {
  posts: Post[];
}

export default function Favorites({ posts }: FavoritesProps) {
  console.log(posts);
  return (
    <>
      <Header />
      <Heading>Seus posts favoritos</Heading>
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

  const { data } = await api.post<{ favoritePosts: Array<{ postId: string }> }>(
    "/favorites/all",
    {
      userEmail: session.user.email,
    }
  );

  // console.log(data);
  const QUERY = `
    {
      posts(where: {id_in: [${data.favoritePosts.map(
        (post) => `"${post.postId}"`
      )}]}) {
        id
        description
        slug
        title
        updatedAt
        banner {
          url
        }
      }
    }
  `;

  const { posts } = await graphcms.request<{ posts: Post[] }>(QUERY);

  return {
    props: {
      posts,
    },
  };
};
