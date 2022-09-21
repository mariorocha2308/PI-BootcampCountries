import React, { useState } from 'react';
import Country from "../components/Country";
import Landing from '../components/Landing'
import Pagination from '../components/Pagination'
import SearchBar from './SearchBar'
import { MdHourglassDisabled } from 'react-icons/md'
import "./styles/home.css";
import { Box } from '@chakra-ui/react';

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
      <div className='countries'>
        {props.data.length !== 0 ? 
          <div className='countries_grid'>
            {props.data?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)?.map((country) => (
              <Country 
                key={country.id}
                name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
                image={country.imageFlag}
                region={country.continent}
                id={country.id}/>
            ))}
          </div> 
          : <MdHourglassDisabled style={{fontSize: '7rem', alignSelft: 'center', marginTop: '6rem'}}/>
        }
      </div>
      <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </Box>
  );
};

export default Home; 