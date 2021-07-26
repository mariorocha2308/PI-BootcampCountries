import "./styles/home.css";
import Country from "./country.jsx";
import { MdArrowBack, MdArrowForward } from "react-icons/md";  
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import { useHistory } from "react-router-dom";
import SearchBar from './searchBar'

const Home = () => {

  //* METODO DE REDIRECCION EN EL BOTON PARA IR A LA RUTA 
  const history = useHistory();

  const handleRoute = () =>{ 
    history.push("/home/newActivity");
  }
  
  //* DESPACHA LA ACCION GET_ALL_COUNTRIES
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
    <div>
      <div className="navBar">
        <label className="title">List Countries</label>
        <SearchBar/>
      </div> 
      {
        dataResult.map((country) => (
          <Country 
            key={country.id}
            name={country.name}
            image={country.imageFlag}
            region={country.continent}
            id={country.id}
          />
        ))
      }
      <button className="float" onClick={handleRoute}>Create Activity</button>
      
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
