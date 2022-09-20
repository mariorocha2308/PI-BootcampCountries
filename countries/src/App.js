import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useQuery } from 'react-query';
import { getCountriesQuery } from './utils/queries';
import Loading from './components/Loading';
import NavBar from './components/Navbar'
import Home from './pages/Home'
import DetailCountry from './pages/DetailCountry'

function App() {

  const { isLoading, data: countries, error, isError } = useQuery(['countries'], getCountriesQuery)
  
  if (isLoading || isError) {
    return <Loading error={error} load={isLoading}/>
  }

  return (
    <frame>
      <Routes>
        <Route path="/" element={<NavBar/>}>

          <Route path='/' element={<Home data={countries}/>}/>
          <Route path="home/country/:id" element={<DetailCountry/>} />
        </Route>
      </Routes>
    </frame>
  );
}

export default App;
