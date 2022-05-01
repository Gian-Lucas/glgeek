import { Icon, Link as ChakraLink } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface IconLinkProps {
  href: string;
  icon: IconType;
}

export function IconLink({ href, icon }: IconLinkProps) {
  return (
    <ChakraLink href={href} isExternal>
      <Icon
        boxSize={["6", "8"]}
        transition="0.4s"
        _hover={{
          transform: "scale(1.2)",
          color: "purple.500",
        }}
        as={icon}
      />
    </ChakraLink>
  );
}
