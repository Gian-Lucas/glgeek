import { Flex, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
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
      <Flex mt="10" justify="center" flexDir="column" align="center">
        <Heading>Seus posts favoritos</Heading>

        {posts.length === 0 && (
          <Text textAlign="justify" fontSize={["18", "20"]} mt="5" mx='10'>
            Você ainda não tem nenhum post marcado como favorito!
          </Text>
        )}
      </Flex>

      {posts.map((post) => {
        return (
          <PostCard key={post.id} post={post} updatedAt={post.updatedAt} />
        );
      })}

      {posts.length === 0 ? (
        <Footer pos="fixed" bottom="0" w="full" />
      ) : (
        <Footer />
      )}
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

  const result = await graphcms.request<{ posts: Post[] }>(QUERY);

  const posts = result.posts.map((post) => {
    return {
      ...post,
      updatedAt: format(new Date(post.updatedAt), "PP", {
        locale: ptBR,
      }),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
