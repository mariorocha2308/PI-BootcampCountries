import React, { useState } from 'react';
import Country from "../components/Country";
import Landing from '../components/Landing'
import Pagination from '../components/Pagination'
import SearchBar from './SearchBar'
import { MdHourglassDisabled } from 'react-icons/md'
import { Box, Grid } from '@chakra-ui/react';

const Home = props => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const total = Math.ceil(props.data?.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  return (
    <Box>
      <Landing/>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <Box my='3rem'>
        {props.data.length !== 0 ? 
          <Grid gap='8' justifyContent='space-between' 
          templateColumns={['100%', '48%, 48%', '44% 44%', '30% 30% 30%', '22% 22% 22% 22%']}
          templateRows={['repeat(12, 12rem)', 'repeat(12, 17rem)', 'repeat(6, 11rem)','repeat(4, 12rem)', 'repeat(3, 9rem)']}>
            {props.data?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)?.map((country) => (
              <Country 
                key={country.id}
                name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
                image={country.imageFlag}
                region={country.continent}
                id={country.id}/>
            ))}
          </Grid> 
          : <Box display='flex' justifyContent='center'>
            <MdHourglassDisabled style={{fontSize: '7rem', marginTop: '6rem'}}/>
          </Box>
        }
      </Box>
      <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </Box>
  );
};

export default Home; 