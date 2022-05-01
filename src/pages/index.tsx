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
  createdAt: string;
  description: string;
  slug: string;
  title: string;
  banner: {
    url: string;
  };
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  // console.log(posts);
  return (
    <>
      <Header />
      {posts.map((post) => {
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
                <Text color="gray.400">{post.createdAt}</Text>
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

const QUERY = gql`
  {
    posts {
      id
      createdAt
      description
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
`;

export const getStaticProps: GetStaticProps = async () => {
  const result = await graphcms.request<{ posts: Post[] }>(QUERY);

  // console.log(result);

  const posts = result.posts.map((post) => {
    return {
      ...post,
      createdAt: format(new Date(post.createdAt), "PP", {
        locale: ptBR,
      }),
      updatedAt: format(new Date(post.createdAt), "PP", {
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
