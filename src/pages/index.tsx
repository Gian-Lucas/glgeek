import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { graphcms } from "../services/graphcms";

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

interface HomeProps {
  posts: Array<{
    id: string;
    createdAt: string;
    description: string;
    slug: string;
    title: string;
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
  }>;
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Header />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await graphcms.request(QUERY);

  return {
    props: {
      posts,
    },
  };
};
