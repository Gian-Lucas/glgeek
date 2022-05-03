import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { graphcms } from "../services/graphcms";
import { Footer } from "../components/Footer";
import { PostCard } from "../components/PostCard";
import { formatDate } from "../utils/formatDate";

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
  return (
    <>
      <Header />
      {postsConnection.edges.map((edge) => {
        const post = edge.node;
        const { updatedAt } = edge;
        return <PostCard key={post.id} post={post} updatedAt={updatedAt} />;
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
    const { simpleDate } = formatDate(post.node.updatedAt);

    return {
      ...post,
      cursor: post.node.id,
      updatedAt: simpleDate,
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
    revalidate: 60 * 60, // 1 hour
  };
};
