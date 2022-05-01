import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { graphcms } from "../services/graphcms";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { Footer } from "../components/Footer";
import { Link } from "../components/Link";

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

interface PostsConnection {
  edges: Array<{
    cursor: string;
    node: Post;
    updatedAt: string;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageSize: number;
  };
}

interface HomeProps {
  postsConnection: PostsConnection;
}

export default function Home({ postsConnection }: HomeProps) {
  console.log(postsConnection);
  return (
    <>
      <Header />
      {postsConnection.edges.map((edge) => {
        const post = edge.node;
        const { updatedAt } = edge;
        return (
          <Flex
            transition="0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
            cursor="default"
            key={post.id}
            maxW="450"
            flexDir="column"
            bg="gray.900"
            mx="auto"
            my="10"
          >
            <Image src={post.banner.url} alt={post.title} />
            <Flex
              flexDir="column"
              p="5"
              borderBottomRadius="lg"
              borderBottom="1px"
              borderLeft="1px"
              borderRight="1px"
              borderColor="gray.600"
            >
              <Link url={`/posts/${post.slug}`}>
                <Heading fontSize="30">{post.title}</Heading>
              </Link>
              <Text color="gray.400" my="5">
                {post.description}
              </Text>

              <Flex justify="space-between">
                <Text color="gray.400">{updatedAt}</Text>
                <Link url={`/posts/${post.slug}`}>Ler mais</Link>
              </Flex>
            </Flex>
          </Flex>
        );
      })}

      <Footer />
    </>
  );
}

interface GraphCMSResult {
  postsConnection: PostsConnection;
}

export const getStaticProps: GetStaticProps = async () => {
  const QUERY = gql`
    {
      postsConnection {
        edges {
          cursor
          node {
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
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `;
  const result = await graphcms.request<GraphCMSResult>(QUERY);

  const edges = result.postsConnection.edges.map((post) => {
    return {
      ...post,
      cursor: post.node.id,
      updatedAt: format(new Date(post.node.updatedAt), "PP", {
        locale: ptBR,
      }),
    };
  });

  const postsConnection = {
    edges,
    pageInfo: result.postsConnection.pageInfo,
  };

  return {
    props: {
      postsConnection,
    },
  };
};
