// import { Link } from "react-router-dom";
import './styles/main.css'
import { useHistory } from "react-router-dom";

const Main = () => {  
    const history = useHistory();
  
    const handleRoute = () =>{ 
        history.push("/home");
    }

    return ( 
        <div className='landing'>
            <div className='landing-contain'>
                <h1 className='landing__text'>Countries</h1>
                <p className='landing__description'>
                    Find, order countries & Create new tourism activities, Just try
                </p>
                <button
                    onClick={handleRoute} className='btn btn-primary'>
                    Home
                </button>
            </div>
        </div>        
     );
}
 
export default Main;