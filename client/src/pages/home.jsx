import "./styles/home.css";
import Country from "./country.jsx";
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import Landing from './landing.jsx'
import Pagination from './pagination.jsx'
import SearchBar from './searchBar.jsx'
import image from './images/undraw_page_not_found_re_e9o6.svg'

const Home = () => {
  
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.allCountries);


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCountries = allCountries.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  console.log(currentCountries)
  return (
    <div className='home'>
      <Landing/>
      <SearchBar/>
      {
        currentCountries.length > 0 ? 
        <div className='countries_grid'>
          {
            currentCountries.map((country) => (
              <Country 
                key={country.id}
                name={country.name.length > 11 ? country.name.slice(0,8) + "..." : country.name}
                image={country.imageFlag}
                region={country.continent}
                id={country.id}
              />
            )) 
          }
        </div>  : <div><img src={image} alt="" className='notFound'/></div>
      }
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={allCountries.length}
        paginate={paginate}/>
    </div>
  );
};

export default Home;
