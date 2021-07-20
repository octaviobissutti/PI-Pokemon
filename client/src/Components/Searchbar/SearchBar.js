import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName, clearPokemon } from '../../Redux/Actions/actions';
import './SearchBar.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SearchBar({setSearch}) {
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setname(e.target.value);
    };

    const handleClick = (e) => {
        if(name) {
            e.preventDefault();
            dispatch(getByName(name));
            setSearch(true);
            setname('hola'); //Mirar porqué no borra lo escrito en el input. 
        } else {
            e.preventDefault();
            setSearch(false);
            dispatch(clearPokemon())
        }
    };



    return (
        <header className = "headerSearch">
        <div className = "containerTitle">
            <a href = "/home" className = "linkTitle"><h6>Home</h6></a> 
        </div> 

        <div className = "containerSearch">   
            <form>
            <input className = "bar"
            type = "text"
            placeholder = "Buscar.."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className = "btn" onClick = {(e) => handleClick(e)}>Buscar</button>
            </form>
        </div>
        <div className = "links">
          <Link className = "linkAddGames" to = "/addPokemon">Create Pokemon</Link>
        </div>
        </header>
    )
}

export default SearchBar

// return (
//     <header className="headerSearch">

//       <div className="containerTitle">
//         <a href="/" className ="linkTitle "><h4>XGames</h4></a>
//       </div> 

//       <div className="containerSearch">
//        <form onSubmit={(e) =>handleSubmit(e)}>
//           <input onChange={(e) => handleChange(e)} className="bar"
//           type="text"
//           placeholder="Buscar"
//          />
//         </form>
//       </div>
//       <div className="links">
//         <Route  path="/AddGame"> <Link className="linkAddGames" to="/">Games</Link></Route>
//         <Route  exact path="/"> <Link className="linkAddGames" to="/Addgame">Add Game</Link> </Route>
          
//       </div>
//     </header>
//     );
// }