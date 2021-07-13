import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName, clearPokemon } from '../../Redux/Actions/actions';
import './SearchBar.css';


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
            setname('hola');
        } else {
            e.preventDefault();
            setSearch(false);
            dispatch(clearPokemon())
        }
    };



    return (
        <div className = "divSearch">
            <form>
            <input className = "input"
            type = "text"
            placeholder = "Buscar.."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className = "btn"onClick = {(e) => handleClick(e)}>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar

