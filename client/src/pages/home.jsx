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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCountries = sortedCountries?.length > 0 ? sortedCountries?.slice(indexOfFirstPost, indexOfLastPost) : allCountries?.slice(indexOfFirstPost, indexOfLastPost) 

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div className='home'>
      <Landing/>
      <SearchBar setCurrentPage={setCurrentPage}/>
      {
        currentCountries?.length > 0 ? 
        <div className='countries_grid'>
          {
            currentCountries?.map((country) => (
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
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={sortedCountries?.length > 0 ? sortedCountries?.length : allCountries?.length}
        paginate={paginate}/>
    </div>
  );
};

export default Home;
