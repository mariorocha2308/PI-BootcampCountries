import "./styles/home.css";
import Country from "./country.jsx";
import { MdArrowBack, MdArrowForward } from "react-icons/md";  
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import {useHistory} from 'react-router-dom'
import Landing from './landing.jsx'

const Home = () => {

  const history = useHistory();
  const handleRouteActivity = () =>{ 
    history.push("/home/newActivity");
  }
  
  const dispatch = useDispatch();
  const result = useSelector(state => state.allCountries);

  const [currentPage, setCurrentPage] = useState(0);
  const dataResult = result.slice(currentPage, currentPage + 10);

  const clickNextPage = () => {
    setCurrentPage(currentPage + 10);
  };

  const clickPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };


  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div className='home'>
      <Landing/>
      <div className='countries_content'>
        {
          dataResult.map((country) => (
            <Country 
              key={country.id}
              name={country.name.length > 11 ? country.name.slice(0,8) + "..." : country.name}
              image={country.imageFlag}
              region={country.continent}
              id={country.id}
            />
          ))
        }
      </div>

      <button className="float" onClick={handleRouteActivity}>Create Activity</button>
      
      { 
        currentPage < 240 ? <h3 className="nextFloat" onClick={clickNextPage}>
        <MdArrowForward/>
        </h3> : null
      }
      
      { 
        currentPage > 0 ? <h3 className="beforeFloat" onClick={clickPrevPage}>
        <MdArrowBack/>
        </h3> : null
      }
      
    </div>
  );
};

export default Home;
