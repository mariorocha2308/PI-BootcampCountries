// import { Link } from "react-router-dom";
import './styles/main.css'
import { useHistory } from "react-router-dom";

const Main = () => {  
    const history = useHistory();
  
    const handleRoute = () =>{ 
        history.push("/home");
    }

    return ( 
        <div className='backImage'>
            <div className='centerStack'>
                <h1 className='titleMain'>Henry Countries</h1>

                 <button
                    onClick={handleRoute} className='btn'>
                    Home
                </button>
            </div>
           
        </div>        
     );
}
 
export default Main;