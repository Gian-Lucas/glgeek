import {
  useDisclosure,
  Flex,
  Heading,
  Avatar,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/client";
import NextLink from "next/link";
import { useRef } from "react";
import { LogoutAlert } from "./LogoutAlert";

export function Header() {
  const [session] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const isMobile = useBreakpointValue({
    sm: true,
  });

  return (
    <>
      <Flex
        as="header"
        bg="gray.700"
        py={["4", "6"]}
        px={["4", "6", "12"]}
        justify="space-between"
        align="center"
      >
        <NextLink href="/">
          <Heading
            cursor="pointer"
            transition="0.3s"
            as="h1"
            fontSize={["25", "30", "38"]}
          >
            <Text color="purple.400" as="span">
              GL
            </Text>
            geek
          </Heading>
        </NextLink>

        {session ? (
          <Flex>
            <Avatar
              name={session.user.name}
              src={session.user.image}
              size={isMobile ? "md" : "sm"}
            />
            {isMobile && (
              <Flex flexDir="column" ml="2">
                <Text fontWeight="bold">{session.user.name}</Text>
                <Flex>
                  <Text
                    mr="1"
                    color="gray.300"
                    cursor="pointer"
                    transition="0.2s"
                    _hover={{
                      color: "purple.300",
                    }}
                  >
                    <NextLink href="/favorites">Favoritos</NextLink>
                  </Text>
                  |
                  <Text
                    onClick={onOpen}
                    ml="1"
                    color="gray.300"
                    cursor="pointer"
                    transition="0.2s"
                    _hover={{
                      color: "purple.300",
                    }}
                  >
                    Sair
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
        ) : (
          <Button
            onClick={() => signIn("google")}
            p={["3", "5"]}
            fontSize={["14", "16"]}
          >
            Entrar
          </Button>
        )}
      </Flex>

      <LogoutAlert cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
