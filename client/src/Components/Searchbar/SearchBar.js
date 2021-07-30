import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { getByName, clearPokemon } from "../../Redux/Actions/actions";
import "./SearchBar.css";
import { Link } from "react-router-dom";

function SearchBar({ setSearch, detail }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setname(e.target.value);
  };

  const handleClick = (e) => {
    if (name) {
      e.preventDefault();
      dispatch(getByName(name));
      setSearch(true);
    } else {
      e.preventDefault();
      setSearch(false);
      dispatch(clearPokemon());
    }
  };

  return (
    <header className="headerSearch">
      <div className="containerTitle">
        <img
          className="img-search"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          alt="not found"
        />
      </div>

      <div className="containerSearch">
          {
            !detail  &&  
        <form>
          <input
            className="bar"
            type="text"
            placeholder="Search.."
            onChange={(e) => handleInputChange(e)}
          />
          <Link to = "/cardDetail/"></Link>
          <button className="btn" onClick={(e) => handleClick(e)}>
            Buscar
          </button>
        </form>
          }
      </div>
      <div className="links">
        <Link className="linkAddPoke" to="/addPokemon">
          Create Pokemon
        </Link>
        <Link className="linkAddPoke" to="/home">
          Home
        </Link>
      </div>
    </header>
  );
}

export default SearchBar;
