import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useEffect, useRef } from "react";

export default function Component() {
  const [session] = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Flex as="header" bg="gray.700" py="5" px="10" justify="space-between">
        <Heading>
          <Text color="purple.400" as="span">
            GL
          </Text>
          geek
        </Heading>

        {session ? (
          <Flex>
            <Avatar
              name={session.user.name}
              src={session.user.image}
              onClick={onOpen}
              cursor="pointer"
            />
            <Flex flexDir="column" ml="2">
              <Text fontWeight="bold">{session.user.name}</Text>
              <Text color="gray.400">{session.user.email}</Text>
            </Flex>
          </Flex>
        ) : (
          <Button onClick={() => signIn("google")}>Entrar</Button>
        )}
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sair
            </AlertDialogHeader>

            <AlertDialogBody>Você deseja fazer logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                color="white"
                bg="purple.500"
                _hover={{
                  bg: "purple.600",
                }}
                onClick={() => signOut()}
                ml={3}
              >
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
