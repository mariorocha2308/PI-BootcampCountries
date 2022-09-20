import React from 'react';
import { deleteActivityQuery, listActivitiesQuery } from '../../utils/queries';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text } from '@chakra-ui/react';

const ListActivities = props => {

  const queryClient = useQueryClient()
  const { data: listItems, refetch } = useQuery(['list'], () => listActivitiesQuery(props.id))
  const { mutate } = useMutation(deleteActivityQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries(['country', props.id])
      refetch()
    }
  })

  return ( 
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Tourism activities {listItems?.length}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          {listItems?.map(item => (
            <Box display='flex' justifyContent='space-between' alignItems='center' key={item.id}>
              <Text>{item.name}</Text>
              <Button variant='outline' colorScheme='red' onClick={() => mutate(item.id)}>Delete</Button>
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' colorScheme='gray' onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ListActivities;