import './styles/Landing.css'
import image from '../pages/images/undraw_camping_noc8.svg';

const Landing = () => {

    return ( 
        <section className='landing'>
            <div className='landing_content'>
                <label className='landing__description-content'>
                    Find, order countries & create tourism activities
                </label>
                <img src={image} alt="undraw world map"  className='landing__image-content'/>
            </div>
        </section> 
    );
}

export default Landing;