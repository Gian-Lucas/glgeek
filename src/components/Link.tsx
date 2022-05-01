import { Link as LinkChakra } from "@chakra-ui/react";
import LinkNext from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  url: string;
  children: ReactNode;
}

export function Link({ url, children }: LinkProps) {
  return (
    <LinkNext href={url}>
      <LinkChakra
        transition="0.2s"
        _hover={{
          color: "purple.400",
        }}
      >
        {children}
      </LinkChakra>
    </LinkNext>
  );
}
