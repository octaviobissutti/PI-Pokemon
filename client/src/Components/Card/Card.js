import React from 'react';
import './Card.css';


const Card = ({image, name, types, height, weight, hp, attack, defense, speed}) => {

  return (
    <div>

      {
          height ? 
          <div> 
            <div className='card'>
              <div>
                <img src={image} alt='Img not found' className='img' width = '200px' height = '200px' />
                <div className='name'>
                  <h5>Name: {name}</h5>
                </div>
           
                  <div className = 'type'>
                
                    <h5>Types: {types}</h5>
                  </div>
                  <div className = 'height'>
                    <h5>Height: {height}</h5>
                  </div>
                  <div className = 'weight'>
                    <h5>Weight: {weight}</h5>
                  </div>
                  <div className = 'hp'>
                    <h5>HP: {hp}</h5>
                  </div>
                  <div className = 'attack'>
                    <h5>Attack: {attack}</h5>
                  </div>
                  <div className = 'defense'>
                    <h5>Defense: {defense}</h5>
                  </div>
                  <div className = 'speed'>
                    <h5>Speed: {speed}</h5>
                  </div>
              </div>
            </div>
          </div>
          :
          <div>
            <div className='card-home'>
              <div>
               <img src={image} alt='Img not found' className='img-home' width = '200px' height = '200px' />
                <div className='name-home'>
                  <h5>Name: {name}</h5>
                </div>           
                <div className = 'type-home'>
                  <h5>Types: {types}</h5>
                </div>
              </div>
            </div>
          </div>
        
      }
    </div>
  );
};


export default Card;
