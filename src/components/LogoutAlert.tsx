import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import { RefObject } from "react";

interface LogoutAlertProps {
  isOpen: boolean;
  cancelRef: RefObject<any>;
  onClose: () => void;
}

export function LogoutAlert({ cancelRef, onClose, isOpen }: LogoutAlertProps) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="sm"
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.700">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Sair
          </AlertDialogHeader>

          <AlertDialogBody>Você deseja fazer logout?</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            >
              Cancelar
            </Button>
            <Button
              color="gray.100"
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
  );
}
