import { Flex, Heading, Image, Text } from "@chakra-ui/react";
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
    // raw: {
    //   children: Array<{
    //     type: string;

    //   }>
    // }
  }>;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Header />
      <Image
        src={post.banner.url}
        alt="Banner"
        w="container.lg"
        mx="auto"
        my="10"
      />
      <Flex flexDir="column">
        <Heading>{post.title}</Heading>
        <Text>Por {post.createdBy.name}</Text>
        <Text>{post.updatedAt}</Text>
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
