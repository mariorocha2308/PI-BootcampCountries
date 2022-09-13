import React, { useState } from 'react';
import Loading from "../components/Loading";
import Country from "../components/Country";
import Landing from '../components/Landing'
import Pagination from '../components/Pagination'
import SearchBar from './SearchBar'
import { useQuery } from 'react-query'
import { MdHourglassDisabled } from 'react-icons/md'
import { getCountriesQuery } from '../utils/queries'
import "./styles/home.css";

const Home = () => {
  
  const { isLoading, data: countries, error, isError } = useQuery(['countries'], getCountriesQuery)

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;
  const total = Math.ceil(countries?.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  if (isLoading || isError) {
    return <Loading error={error} load={isLoading}/>
  }

  return (
    <div className='home'>
      <Landing/>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <div className='countries'>
        {countries.length !== 0 ? 
          <div className='countries_grid'>
            {countries?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)?.map((country) => (
                <Country 
                  key={country.id}
                  name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
                  image={country.imageFlag}
                  region={country.continent}
                  id={country.id}
                />
              ))
            }
          </div> 
          : <MdHourglassDisabled style={{fontSize: '7rem', alignSelft: 'center', marginTop: '6rem'}}/>
        }
      </div>
      <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  );
};

export default Home; 