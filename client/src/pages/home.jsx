import "./styles/home.css";
import Country from "./country.jsx";
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import {MdOutlineHourglassDisabled} from 'react-icons/md'
import Landing from './landing.jsx'
import Pagination from './pagination.jsx'
import SearchBar from './searchBar.jsx'

const Home = () => {
  
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.allCountries);
  const sortedCountries = useSelector(state => state.sortedCountries);
  const renderCountries = sortedCountries?.length > 0 ? sortedCountries : allCountries

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;
  const currentCountries = sortedCountries?.length > 0 ? sortedCountries.length : allCountries.length
  const total = Math.ceil(currentCountries / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div className='home'>
      <Landing/>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <div className='countries'>
      {
        renderCountries?.length > 0 ? 
        <div className='countries_grid'>
          {
            renderCountries?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((country) => (
              <Country 
                key={country.id}
                name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
                image={country.imageFlag}
                region={country.continent}
                id={country.id}
              />
            )) 
          }
        </div>  : 
        <div className='notAvalaible'>
          <MdOutlineHourglassDisabled className='notFound-icon'/>
          <label className='notFound-text'>Not avalaible</label>
        </div>
      }
      </div>
      <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  );
};

export default Home;
