import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Spinner, Text, Box, Image } from '@chakra-ui/react'

const Loading = props => {

  if (props.load === false) {
    return <Box display='flex' mt='20rem' justifyContent='center'>
      <Alert status='error' variant='left-accent' alignItems='center' justifyContent='center' height='80px' width='30vw' fontSize='1xl' fontFamily='Poppins'>
        <AlertIcon/>
        <AlertTitle>Error!!</AlertTitle>
        <AlertDescription>{props.error}</AlertDescription>
      </Alert>
    </Box>
  }

  return ( 
    <Box display='flex' mt='20rem' flexDirection='column' alignItems='center'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg'/>
      <Text fontFamily='Poppins' mt='3.5'>Loading</Text>
    </Box>
  );
}

export default Loading;