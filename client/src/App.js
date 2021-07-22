import './App.css';
import { Route } from "react-router-dom";
import Main from './pages/main.jsx'
import Home from './pages/home.jsx'
import CreateActivity from './pages/createActivity.jsx'
import CountryDetail from './pages/detailCountry.jsx'

function App() {
  return (

    <div className="App">

      {/* RUTEAMOS LA LANGIND PAGE */}
      <Route exact path='/'>
        <Main/>
      </Route>      
      
      {/* LLAMAMOS A NUESTRO COMPONENTE HOME PARA REDIRECIONAR LA RUTA */}
      <Route exact path="/home">
        <Home/>
      </Route>

      <Route exact path="/home/newActivity">
        <CreateActivity/>
      </Route>

      <Route exact path='/home/countries/:id' component={CountryDetail}/>
    </div>
  );
}

export default App;
