import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { IconLink } from "./IconLink";
import { AiFillGithub } from "react-icons/ai";

interface FooterProps extends FlexProps {}

export function Footer({ ...rest }: FooterProps) {
  return (
    <Flex
      as="footer"
      bg="gray.700"
      justify="space-between"
      align="center"
      py="7"
      px={["6", "12"]}
      {...rest}
    >
      <Text fontSize={["14", "16"]}>
        <Text as="span" color="purple.300" fontWeight="bold" mr="2">
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
