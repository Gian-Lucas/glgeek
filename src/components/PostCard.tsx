import { Flex, Heading, Image, Text } from "@chakra-ui/react";
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

interface PostCardProps {
  post: Post;
  updatedAt: string;
}

export function PostCard({ post, updatedAt }: PostCardProps) {
  return (
    <Flex
      transition="0.3s"
      _hover={{
        transform: "scale(1.05)",
      }}
      cursor="default"
      maxW="450"
      flexDir="column"
      bg="gray.900"
      mx={["10", "auto"]}
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
          <Heading fontSize={["20", "30"]}>{post.title}</Heading>
        </Link>
        <Text color="gray.400" my="5" fontSize={["14", "16"]}>
          {post.description}
        </Text>

        <Flex justify="space-between">
          <Text color="gray.400" fontSize={["14", "16"]}>
            {updatedAt}
          </Text>
          <Link url={`/posts/${post.slug}`} fontSize={["14", "16"]}>
            Ler mais
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
