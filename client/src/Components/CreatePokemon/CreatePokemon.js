import React, { useState, useEffect } from 'react';
import './CreatePokemon.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getAllTypes } from '../../Redux/Actions/actions';

export default function CreatePokemon() {

    const getTypes = useSelector(state => state.getTypes);

    const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(getAllTypes());
  },[dispatch])
 
    const [input, setInput] = useState({
       name: '',
       types: [],
       hp: '',
       attack: '',
       defense: '',
       speed: '',
       height: '', 
       weight: '',
       image : 'https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg'
 
      });
     
      const [errors, setErrors] = useState({});
    
      const handleInputChange = function(e) {
        if(e.target.name === 'type1' || e.target.name === 'type2' ) {
          setInput({
            ...input,
            types: [...input.types, e.target.value]
          })
        } else {
          setInput({
            ...input,
            [e.target.name]: e.target.value
          });
        };
        
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      }

      const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(input);
        addPokemon(input);
        setInput({
          name: '',
          types: [],
          hp: '',
          attack: '',
          defense: '',
          speed: '',
          height: '', 
          weight: '',
        });

    };
  
      
      return (
        <form onSubmit={handleSubmit}>
          <Link to = {`/home`}>Home</Link>
            <div>
              <label>PokeName:</label>
              <input className={errors.PokeName && 'danger'} type="text" name="name" onChange={handleInputChange} value={input.name} />
              {errors.name && (
                <p className="danger">{errors.name}</p>
                )}
               
              <div>
              <label>Hp:</label>
              <input className={errors.hp && 'danger'} type="number" name="hp" onChange={handleInputChange} value={input.hp} />
            
         <div>
              <label>Attack:</label>
              <input className={errors.attack && 'danger'} type="number" name="attack" onChange={handleInputChange} value={input.attack} />
              
         <div>
              <label>Defense:</label>
              <input className={errors.defense && 'danger'} type="number" name="defense" onChange={handleInputChange} value={input.defense} />
             
         <div>
              <label>Speed:</label>
              <input className={errors.speed && 'danger'} type="number" name="speed" onChange={handleInputChange} value={input.speed} />
              
         <div>
              <label>Height:</label>
              <input className={errors.heigth && 'danger'} type="number" name="height" onChange={handleInputChange} value={input.height} />
            
         <div>
              <label>Weight:</label>
              <input className={errors.weigth && 'danger'} type="number" name="weight" onChange={handleInputChange} value={input.weight} />
            </div>
          <div>
              <label>Type-1</label>
              <select className={errors.type1 && "type1"} name="type1" value={input.id} onChange={handleInputChange}>
              <option value='null'>null</option>
              {getTypes && getTypes.map(t => (
                <option value = {t.id} name = {t.name}>{t.name}</option>
              ))}
               {errors.type1 && ( <p className="type1">{errors.type1}</p>)}
              </select>
              <br/>

            </div>
          <div>
          <label>Type-2</label>
              <select className={errors.type2 && "type2"} name="type2" value={input.id} onChange={handleInputChange}>
              <option value='null'>null</option>
              {getTypes && getTypes.map(t => (
                <option value = {t.id} name = {t.name}>{t.name}</option>
              ))}
               {errors.type2 && ( <p className="type2">{errors.type2}</p>)}
              </select>
            </div>    
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            {/* <button type="submit">CREATE</button> */}
            <button onClick={()=>dispatch(addPokemon(input))}>CREATE</button>
          </form>
        )
} 

 export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'PokeName is required';
    } else if (!/^[A-Za-z]+$/.test(input.name)) {
      errors.name = 'PokeName must be a text string';
    }
    return errors;
};

