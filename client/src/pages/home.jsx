import "./styles/home.css";
import Country from "./country.jsx";
import { MdArrowBack, MdArrowForward } from "react-icons/md";  
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries, nextPage, prevPage } from '../actions/actions.js';
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
  const offset = useSelector(state => state.offset);
  let resultCountry = result.slice(0, 10);

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
        resultCountry.map((country) => (
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
        offset <= 230 ? <h3 className="nextFloat">
        <MdArrowForward onClick={() => dispatch(nextPage(10))}/>
        </h3> : null
      }
        
      <h3 className="beforeFloat">
        <MdArrowBack onClick={() => dispatch(prevPage(10))}/>
      </h3>
    </div>
  );
};

export default Home;
