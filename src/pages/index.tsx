import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import Image from "next/image";
import { Header } from "../components/Header";
import { graphcms } from "../services/graphcms";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

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
        width
        height
      }
      createdBy {
        name
      }
    }
  }
`;

interface Post {
  id: string;
  createdAt: string;
  description: string;
  slug: string;
  title: string;
  updatedAt: string;
  banner: {
    url: string;
    width: number;
    height: number;
  };
  createdBy: {
    name: string;
  };
  content: Array<{
    html: string;
    // raw: {
    //   children: Array<{
    //     type: string;

    //   }>
    // }
  }>;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  console.log(posts);
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
            cursor="pointer"
            key={post.id}
            maxW="420"
            flexDir="column"
            bg="gray.900"
            mx="auto"
            my="10"
          >
            <Image
              src={post.banner.url}
              alt={post.title}
              width={420}
              height={210}
            />
            <Flex
              flexDir="column"
              p="5"
              borderBottomRadius="lg"
              borderBottom="1px"
              borderLeft="1px"
              borderRight="1px"
              borderColor="gray.600"
            >
              <Heading fontSize="30">{post.title}</Heading>
              <Text color="gray.400" my="5">
                {post.description}
              </Text>

              <Flex justify="space-between">
                <Text color="gray.400">{post.createdAt}</Text>
                <Link href="#">Ler mais</Link>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await graphcms.request<{ posts: Post[] }>(QUERY);

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
