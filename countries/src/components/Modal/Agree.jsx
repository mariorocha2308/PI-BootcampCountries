import React from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  Button } from '@chakra-ui/react';

const Agree = props => {

  return (  
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <p>You won't be able to revert this change!</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={props.handleAgree}>
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Agree;