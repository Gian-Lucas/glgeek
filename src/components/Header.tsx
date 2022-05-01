import {
  useDisclosure,
  Flex,
  Heading,
  Avatar,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/client";
import Link from "next/link";
import { useRef } from "react";
import { LogoutAlert } from "./LogoutAlert";

export function Header() {
  const [session] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Flex as="header" bg="gray.700" py="5" px="10" justify="space-between">
        <Link href="/">
          <Heading cursor="pointer" transition="0.3s">
            <Text color="purple.400" as="span">
              GL
            </Text>
            geek
          </Heading>
        </Link>

        {session ? (
          <Flex>
            <Avatar name={session.user.name} src={session.user.image} />
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
                  <Link href="/favorites">Favoritos</Link>
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
          </Flex>
        ) : (
          <Button onClick={() => signIn("google")}>Entrar</Button>
        )}
      </Flex>

      <LogoutAlert cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
