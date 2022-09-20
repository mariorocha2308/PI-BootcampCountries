import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { postActivityQuery } from '../../utils/queries'
import { useQueryClient, useMutation } from 'react-query'
import makeAnimated from 'react-select/animated';
import { optionDifficult, optionDuration, optionSeason } from '../../utils/selects'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Alert, AlertIcon, FormControl, Input, Stack  } from '@chakra-ui/react'

const PostTourism = props => {

  const queryClient = useQueryClient()
  const { data: cacheClient } = queryClient.getQueryState('countries')
  const { mutate, isError, error, isLoading, reset } = useMutation(postActivityQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries(['country'])
      queryClient.invalidateQueries(['countries'])
    }
  })

  //* LOGICA EL ESTADO DEL FORM 
  const [input, setInput] = useState({
    name:"",
    duration: "",
    season: "",
    difficult: "",
    codeCountry: [],
  })

  const animatedComponents = makeAnimated();
  let optionsCountry = cacheClient.map((country) => {
    return { value: country.id, label: country.name };
  })

  const handleTitle = (e) => {setInput({...input, name:e.target.value})}
  const handleDifficult = (e) => {setInput({...input, difficult:e.value})}
  const handleDuration = (e) => {setInput({...input, duration:e.value})} 
  const handleSeason = (e) => {setInput({...input, season:e.value})}
  const handleCountries = (e) => {
    setInput({...input, codeCountry: Array.isArray(e) ? e.map((x) => x.value) : []});
  }

  const submitForm = (e) => {
    e.preventDefault()
    
    mutate(input, {
      onSuccess: () => {
        setInput({...input, name: '', duration: '', season: '', difficult: '', codeCountry: []})
        props.onClose()
      },
      onError: () => {
        setTimeout(() => reset(), 4000)
      }
    })
  }

  useEffect(() => {
    setInput({...input, name: '', duration: '', season: '', difficult: '', codeCountry: []})
  },[])

  return ( 
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Create Tourism</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <FormControl>
            <Stack spacing='2.5'>
              <Input variant='outline' onChange={handleTitle} placeholder='Title of activity'/>
              <Select name='difficult' onChange={handleDifficult} defaultValue={optionDifficult[0]} 
                options={optionDifficult}/>
              <Select name='duration' onChange={handleDuration} defaultValue={optionDuration[0]}
                options={optionDuration}/>
              <Select name='season' onChange={handleSeason} defaultValue={optionSeason[0]}
                options={optionSeason}/>
              <Select className='selectStyleCountry' name='codeCountry' isMulti onChange={handleCountries} 
                options={optionsCountry}
                components={animatedComponents}
                closeMenuOnSelect={false}
                placeholder='Select countries..'/>
            </Stack>
          </FormControl>   
        </ModalBody>
        <ModalFooter>
          {isError ? 
            <Alert status='error' variant='subtle' fontFamily='Poppins' >
              <AlertIcon/>
              {error}
            </Alert>
            : <>
              <Button variant='ghost' mr='3.5' onClick={props.onClose}>close</Button>
              <Button colorScheme='blue' onClick={submitForm} isLoading={isLoading}>
                create
              </Button>
            </>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PostTourism;