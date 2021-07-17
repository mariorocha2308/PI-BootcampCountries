import "./styles/home.css";
import Country from "./country.jsx";
import { MdFilterList, MdArrowBack, MdArrowForward } from "react-icons/md";  
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries } from '../actions/actions.js';



const Home = () => {
  
  const dispatch= useDispatch();
  const result= useSelector(state => state.allCountries);
 
  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div>
      <div className="navBar">
        <label className="title">List Countries</label>
        <div className="filterBar">
          <MdFilterList className="iconFilter" />{" "}
          <input type="text" placeholder="Search" />
        </div>
      </div>
      {
        result.map((country) => (
          <Country
            name={country.name}
            image={country.imageFlag}
            region={country.continent}
          />
        ))
      }

      <button className="float">Create Activity</button>

      <h3 className="nextFloat">
        <MdArrowForward />
      </h3>
      <h3 className="beforeFloat">
        <MdArrowBack />
      </h3>
    </div>
  );
};

export default Home;
