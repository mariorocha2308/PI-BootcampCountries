import './App.css';
import { Route } from "react-router-dom";
import NavBar from './pages/navbar.jsx'
import Home from './pages/home.jsx'
import CreateActivity from './pages/createActivity.jsx'
import CountryDetail from './pages/detailCountry.jsx'
import 'antd/dist/antd.css';

function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home/newActivity" component={CreateActivity}/>
      <Route exact path='/home/countries/:id' component={CountryDetail}/>
    </div>
  );
}

export default App;