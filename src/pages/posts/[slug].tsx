import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { graphcms } from "../../services/graphcms";
import { RiBookmarkFill } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { useState } from "react";
import { api } from "../../services/api";
import { getSession, useSession } from "next-auth/client";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  updatedAt: string;
  isFavorite: boolean;
  banner: {
    url: string;
  };
  createdBy: {
    name: string;
  };
  content: Array<{
    html: string;
    raw: {
      children: [];
    };
  }>;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [session] = useSession();
  const [isFavorite, setIsFavorite] = useState(post.isFavorite);

  async function addToFavorites() {
    try {
      const res = await api.post("/favorites/create", {
        postId: post.id,
        userEmail: session.user.email,
      });

      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromFavorites() {
    try {
      const res = await api.post("/favorites/remove", {
        postId: post.id,
        userEmail: session.user.email,
      });

      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Image src={post.banner.url} alt="Banner" w="100%" mx="auto" mb="4" />

      <Flex flexDir="column" maxW="1080" mx="auto">
        <Flex flexDir="row" px="5" justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold" fontSize={["14", "16"]}>
              Escrito por {post.createdBy.name}
            </Text>
            <Text color="gray.300" fontSize={["14", "16"]}>
              {post.updatedAt}
            </Text>
          </Box>

          {isFavorite ? (
            <Icon
              onClick={removeFromFavorites}
              transition="0.2s"
              color="purple.500"
              _hover={{
                transform: "scale(1.1)",
              }}
              as={RiBookmarkFill}
              boxSize={["6", "7"]}
              cursor="pointer"
            />
          ) : (
            <Icon
              onClick={addToFavorites}
              transition="0.2s"
              _hover={{
                transform: "scale(1.1)",
                color: "purple.500",
              }}
              as={RiBookmarkLine}
              boxSize={["6", "7"]}
              cursor="pointer"
            />
          )}
        </Flex>

        <Flex px="5" flexDir="column" my="5">
          <Heading fontSize={["30", "38", "45"]} mb="2">
            {post.title}
          </Heading>
          <Text color="gray.200" fontSize={["16", "18"]} textAlign="justify">
            {post.description}
          </Text>
        </Flex>

        <Box px="5">
          <RichText
            content={post.content[0].raw}
            renderers={{
              h1: ({ children }) => (
                <Heading my="5" fontSize={["25", "30", "35"]}>
                  {children}
                </Heading>
              ),
              h2: ({ children }) => (
                <Heading my="5" fontSize={["25", "30", "35"]}>
                  {children}
                </Heading>
              ),
              p: ({ children }) => (
                <Text
                  my="5"
                  color="gray.200"
                  fontSize={["16", "18"]}
                  textAlign="justify"
                >
                  {children}
                </Text>
              ),
              img: ({ src, title }) => <Image mx='auto' src={src} alt={title} mb="16" />,
            }}
          />
        </Box>
      </Flex>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const result = await graphcms.request<{ post: Post }>(gql`
      {
        post(where: { slug: "${params.slug}" }) {  
            id  
            createdAt
            slug
            title
            description
            updatedAt
            content {
                html
                raw
            }
            banner {
                url
            }
            createdBy {
                name
            }
        }
      }
    `);

  const res = await api.post("/favorites/favorited", {
    postId: result.post.id,
    userEmail: session.user.email,
  });

  const post = {
    ...result.post,
    updatedAt: format(new Date(result.post.updatedAt), "PPPp", {
      locale: ptBR,
    }),
    isFavorite: res.data.isInFavorites,
  };

  return {
    props: {
      post,
    },
  };
};
