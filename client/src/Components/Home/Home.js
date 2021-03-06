import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import SearchBar from "../Searchbar/SearchBar";
import { Link } from "react-router-dom";
import { getAllPokemons, getAllTypes } from "../../Redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../Filter/Filter";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const getPokemons = useSelector((state) => state.getPokemons);
  const getTypes = useSelector((state) => state.getTypes);
  const searchPokemon = useSelector((state) => state.searchPokemon);

  const [search, setSearch] = useState(false);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (getTypes) {
      dispatch(getAllTypes());
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps         
  }, [dispatch]);


  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  const indexOfLastPost = currentPage * pokemonsPerPage;
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
  const currentPokemons = getPokemons.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumber = Math.ceil(getPokemons.length / pokemonsPerPage);

  const nextPage = () => {
    if (currentPage < pageNumber) setCurrentPage(currentPage + 1);
    else setCurrentPage(1);
  };

  const prePage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    else setCurrentPage(pageNumber);
  };

  return (
    <div>
      <SearchBar setSearch={setSearch} />
      {
        currentPokemons?.length > 0 
        ?
        <div className="home">
        <div className="filter-home">
          <Filter />
        </div>

        <div className="container">
          {search
            ? 
            searchPokemon && (
              <div className = "div-search">
                  <Card 
                    name={searchPokemon.name}
                    image={searchPokemon.image}
                    types={searchPokemon.types}
                    key={searchPokemon.id}
                    height={searchPokemon.height}
                    weight = {searchPokemon.weight}
                    hp = {searchPokemon.hp}
                    attack = {searchPokemon.attack}
                    defense = {searchPokemon.defense}
                    speed = {searchPokemon.speed} 
                  />
                </div>
              )
            : currentPokemons?.length > 0 &&
              currentPokemons.map((pokemon) => (
                <Link className="link" to={`/cardDetail/${pokemon.id}`}>
                  <Card
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                    key={pokemon.id}
                  />
                 </Link>
                
                 
              ))}
        </div>
        <div className="paginate">
          <button
            className={`${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => {
              prePage();
            }}
          >
            Previous
          </button>
          <button
            className={`${currentPage === pageNumber ? "disabled" : ""}`}
            onClick={() => {
              nextPage();
            }}
          >
            Next
          </button>
        </div>
      </div>
      : <img className = "loading" src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ecd5fab-be8d-4409-bd84-4a3d205b9ec8/daehq7e-48b7f14a-14ff-4082-9e7c-aee710c9bbfd.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlY2Q1ZmFiLWJlOGQtNDQwOS1iZDg0LTRhM2QyMDViOWVjOFwvZGFlaHE3ZS00OGI3ZjE0YS0xNGZmLTQwODItOWU3Yy1hZWU3MTBjOWJiZmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GW_7jlunpf-1g4Dy3ppLR414Q_YBZ6MxF9QAVlbV4Ck" alt = "not found"/> 
      }
     
    </div>
  );
}

export default Home;
