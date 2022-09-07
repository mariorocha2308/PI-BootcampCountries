import './styles/landing.css'
import image from './images/undraw_camping_noc8.svg';

const Landing = () => {
    return ( 
        <div className='landing'>
            <div className='landing_content'>
                <p className='landing__description-content'>
                    Find, order countries & create tourism activities
                </p>
                <img src={image} alt="undraw world map"  className='landing__image-content'/>
            </div>
        </div> 
    );
}
 
export default Landing;