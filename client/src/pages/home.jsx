import "./styles/home.css";
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import Loading from "../components/Loading";
import Country from "./country.jsx";
import Landing from './landing.jsx'
import Pagination from './pagination.jsx'
import SearchBar from './searchBar.jsx'

const Home = () => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const { allCountries, sortedCountries } = useSelector(state => state.reducerSlice);
  const renderCountries = sortedCountries?.length > 0 ? sortedCountries : allCountries

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;
  const currentCountries = sortedCountries?.length > 0 ? sortedCountries.length : allCountries.length
  const total = Math.ceil(currentCountries / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(getAllCountries())
    } else {
      setLoading(false)
    }
  },[dispatch, allCountries])

  if (loading) {
    return <Loading error='Failed to get countries'/>
  }

  return (
    <div className='home'>
      <Landing/>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <div className='countries'>
        <div className='countries_grid'>
          {renderCountries?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((country) => (
            <Country 
              key={country.id}
              name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
              image={country.imageFlag}
              region={country.continent}
              id={country.id}
            />
          ))}
        </div>
      </div>
      <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  );
};

export default Home; 