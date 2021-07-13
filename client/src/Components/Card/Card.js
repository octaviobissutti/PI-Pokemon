import React from 'react';
import './Card.css';


const Card = ({image, name, types}) => {

  return (
    <div>
      {
        <div className='card'>
          <div>
            <img src={image} alt='Img not found' className='img' width = '200px' height = '200px' />
            <div className='name'>
              <h5>Name: {name}</h5>
            </div>
            {/* <div className='type-container'>{types && types.map(el =>  {
              el.length > 1
              ? <p>Types: <br></br>
                {el[0]} & {el[1]}</p>
              : <p>Type: <br></br> 
                {el[0]}
              </p>}  
             )}
            </div> */}
            <div className = 'type'>
                
                <h5>Types: {types}</h5>
            </div>
    
          </div>
        </div>
      }
    </div>

  );
};


export default Card;