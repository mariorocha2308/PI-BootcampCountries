import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/Navbar'
import Home from './pages/Home'
import DetailCountry from './pages/DetailCountry'
import { useQuery } from 'react-query';
import { getCountriesQuery } from './utils/queries';
import Loading from './components/Loading';

function App() {

  const { isLoading, data: countries, error, isError } = useQuery(['countries'], getCountriesQuery)
  
  if (isLoading || isError) {
    return <Loading error={error} load={isLoading}/>
  }

  return (
    <div className="App">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home data={countries}/>}/>
        <Route path='/home/country/:id' element={<DetailCountry/>}/>
      </Routes>
    </div>
  );
}

export default App;
