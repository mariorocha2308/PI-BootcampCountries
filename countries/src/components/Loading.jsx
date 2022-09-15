import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Spinner } from '@chakra-ui/react'

const Loading = props => {

  if (props.load === false) {
    return <section style={{display: 'flex', marginTop: '20rem', justifyContent: 'center'}}>
      <Alert status='error' 
        variant='left-accent' 
        alignSelf='center'
        alignItems='center'
        justifyContent='center'
        height='80px'
        width='30vw'
        fontSize='1xl'
        fontFamily='Poppins'>
        <AlertIcon/>
        <AlertTitle>Error!!</AlertTitle>
        <AlertDescription>{props.error}</AlertDescription>
      </Alert>
    </section>
  }

  return ( 
    <div style={{display: 'flex', marginTop: '20rem', alignSelf: 'center', flexDirection: 'column'}}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        alignSelf='center'
      />
      <label style={{marginTop: '1rem', fontSize: '15px', fontFamily: 'Poppins'}}>Loading</label>
    </div>
  );
}

export default Loading;