import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { graphcms } from "../../services/graphcms";

interface Post {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
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
  console.log(post);
  return (
    <>
      <Header />
      <Flex flexDir="column" maxW="1080" mx="auto">
        <Image src={post.banner.url} alt="Banner" w="100%" mx="auto" mb="10" />
        <Flex px="5" mb="20" flexDir="column">
          <Heading fontSize={["30", "38", "45"]}>{post.title}</Heading>
          <Flex mt="4" flexDir={["column", "row"]}>
            <Text fontWeight="bold" mr="10" fontSize={["14", "16"]}>
              Escrito por {post.createdBy.name}
            </Text>
            <Text color="gray.300" fontSize={["14", "16"]}>
              {post.updatedAt}
            </Text>
          </Flex>
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
              img: ({ src, title }) => <Image src={src} alt={title} mb="16" />,
            }}
          />
        </Box>
      </Flex>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const result = await graphcms.request<{ post: Post }>(gql`
      {
        post(where: { slug: "${params.slug}" }) {  
            createdAt
            slug
            title
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

  const post = {
    ...result.post,
    updatedAt: format(new Date(result.post.updatedAt), "PPPPp", {
      locale: ptBR,
    }),
  };

  return {
    props: {
      post,
    },
  };
};
