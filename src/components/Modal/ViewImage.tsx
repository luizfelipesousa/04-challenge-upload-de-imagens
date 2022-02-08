import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent maxWidth="900px">
          <ModalBody bgColor="pGray.800" p="0">
            <Image src={imgUrl} margin="auto" />
          </ModalBody>
          <ModalFooter bgColor="pGray.800" paddingY="1.5" width="100%">
            <Link href={imgUrl} target="_blank" mr="auto">
              <a href={imgUrl}>Abrir original</a>
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
