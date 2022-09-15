import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/Navbar'
import Home from './pages/Home'
import PostTourism from './pages/PostTourism'
import DetailCountry from './pages/DetailCountry'

function App() {
  return (
    <div className="App">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home/post/tourism" element={<PostTourism/>}/>
        <Route path='/home/country/:id' element={<DetailCountry/>}/>
      </Routes>
    </div>
  );
}

export default App;
