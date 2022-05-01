import { Flex, Text } from "@chakra-ui/react";
import { IconLink } from "./IconLink";
import { AiFillGithub } from "react-icons/ai";

export function Footer() {
  return (
    <Flex
      as="footer"
      bg="gray.700"
      justify="space-between"
      align="center"
      p="10"
    >
      <Text>
        <Text as="span" color="purple.400" fontWeight="bold" mr="2">
          GLgeek
        </Text>
        2022 Todos os direitos reservados.
      </Text>

      <IconLink
        href="https://github.com/Gian-Lucas/glgeek"
        icon={AiFillGithub}
      />
    </Flex>
  );
}
