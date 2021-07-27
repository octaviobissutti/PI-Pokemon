import React, { useState, useEffect } from 'react';
import './CreatePokemon.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getAllTypes } from '../../Redux/Actions/actions';
import SearchBar from '../Searchbar/SearchBar';

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
        <div className = "div-gral">
        <form onSubmit={handleSubmit}>
         <SearchBar /> 
            <div className = "form-body">
              <h1 className = "logo">Create <span>Pokemon</span></h1>
              <label>PokeName:</label>
              <br></br>
              <input className={errors.PokeName && 'danger'} type="text" name="name" onChange={handleInputChange} value={input.name} required />
              {errors.name && (
                <p className="danger">{errors.name}</p>
                )}
               
              <div>
              <label>Hp:</label>
              <br></br>
              <input className={errors.hp && 'danger'} type="number" min = "1" max ="500" name="hp" onChange={handleInputChange} value={input.hp} required  />
            
         <div>
              <label>Attack:</label>
              <br></br>

              <input className={errors.attack && 'danger'} type="number" name="attack" onChange={handleInputChange} value={input.attack} required/>
              
         <div>
              <label>Defense:</label>
              <br></br>

              <input className={errors.defense && 'danger'} type="number" name="defense" onChange={handleInputChange} value={input.defense} required/>
             
         <div>
              <label>Speed:</label>
              <br></br>

              <input className={errors.speed && 'danger'} type="number" name="speed" onChange={handleInputChange} value={input.speed} required/>
              
         <div>
              <label>Height:</label>
              <br></br>

              <input className={errors.heigth && 'danger'} type="number" name="height" onChange={handleInputChange} value={input.height} required />
            
         <div>
              <label>Weight:</label>
              <br></br>

              <input className={errors.weigth && 'danger'} type="number" name="weight" onChange={handleInputChange} value={input.weight} required/>
            </div>
          <div>
              <label>Type-1</label>
              <br></br>

              <select className={errors.type1 && "type1"} name="type1" value={input.id} onChange={handleInputChange} autoComplete = "false">
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
          <br></br>

              <select className={errors.type2 && "type2"} name="type2" value={input.id} onChange={handleInputChange} autoComplete = "false">
              <option value='null'>null</option>
              {getTypes && getTypes.map(t => (
                <option value = {t.id} name = {t.name}>{t.name}</option>
              ))}
               {errors.type2 && ( <p className="type2">{errors.type2}</p>)}
              </select>
            </div>    
            <button className= "btn-create" onClick={()=>dispatch(addPokemon(input))}>CREATE</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            {
                  alert.create ? (
                      <div className='create--confirm'>
                          <h3 className='message--create'>Pokemon created succesfully!</h3>
                      </div>
                  ) : null
              }
          </form>
          </div>
        )
} 

 export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'PokeName is required';
    } else if (!/^[A-Za-z]+$/.test(input.name)) {
      errors.name = 'PokeName must be a text string';
    }
    else if (!input.hp) {
      errors.hp = 'HP is required';
    } else if (!/^([1-9]|[1-9][0-9]|[1-2][0-5][0-5])$/.test(input.hp)) {
      errors.hp = 'HP is invalid';
    }
    else if (!input.attack) {
      errors.attack = 'Attack is required';
    } else if (!/^([5-9]|[1-9][0-9]|[1][0-8][0-9]|[1][9][0])$/.test(input.attack)) {
      errors.attack = 'Attack is invalid';
    }
    else if (!input.defense) {
      errors.defense = 'Defense is required';
    } else if (!/^([5-9]|[1-9][0-9]|[1-2][0-2][0-9]|[2][3][0])$/.test(input.defense)) {
      errors.defense = 'Defense is invalid';
    }
    else if (!input.speed) {
      errors.speed = 'Speed is required';
    } else if (!/^([5-9]|[1-9][0-9]|[1][0-1][0-6])$/.test(input.speed)) {
      errors.speed = 'Speed is invalid';
    }
    else if (!input.weight) {
      errors.weight = 'Weight is required';
    } else if (!/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9])$/.test(input.weight)) {
      errors.weight = 'Weight is invalid';
    }
    else if (!input.height) {
      errors.height = 'Height is required';
    } else if (!/^([1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0][0])$/.test(input.height)) {
      errors.height = 'Height is invalid';
    }
    if (!input.type1 || input.type1 === "null") {
      errors.type1 = 'Type can not be null';
    } 
    return errors;
};

