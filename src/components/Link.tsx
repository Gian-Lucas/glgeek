import { Link as LinkChakra, LinkProps } from "@chakra-ui/react";
import LinkNext from "next/link";
import { ReactNode } from "react";

interface LinkPropsComponent extends LinkProps {
  url: string;
  children: ReactNode;
}

export function Link({ url, children, ...rest }: LinkPropsComponent) {
  return (
    <LinkNext href={url}>
      <LinkChakra
        transition="0.2s"
        _hover={{
          color: "purple.400",
        }}
        {...rest}
      >
        {children}
      </LinkChakra>
    </LinkNext>
  );
}
