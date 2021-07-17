import './styles/country.css'

const Country = (props) => {
    return ( 
        <div className='card'>
            <img src={props.image} alt={props.name} className='img'/>
            <h2 className='titleCard'>{props.name}</h2>
            <h4 className='continentTitle'>Continent: {props.region}</h4>
            <h5 className='infoTitle'>Mostrar mas</h5>
        </div> 
    );
}
 
export default Country;