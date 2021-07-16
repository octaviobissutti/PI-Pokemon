import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';
import { getAllPokemons, getAllTypes} from '../../Redux/Actions/actions';
import  { useSelector, useDispatch } from 'react-redux';
// import CreatePokemon from '../CreatePokemon/CreatePokemon';
// import NavBar from '../Navbar/NavBar';
import Paginate from '../Paginate/Paginate';

function Home() {

const dispatch = useDispatch();
const getPokemons = useSelector((state) => state.getPokemons);
const getTypes = useSelector((state) => state.getTypes);
const searchPokemon = useSelector((state) => state.searchPokemon);

const [search, setSearch] = useState(false);

useEffect(() => {
    if(getPokemons) {
        dispatch(getAllPokemons())
    }
},[])

useEffect(() => {
    if(getTypes) {
        dispatch(getAllTypes())
    }
}, [])


useEffect(() => {
    if(!searchPokemon) {
        alert('Pokemon not found :(');
    }
}, [searchPokemon])


// const [allPokemons, setAllPokemons] = useState([]);
    
// const indexOfLastPokemon = currentPage * pokemonPerPage;
// const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
// const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
// const paginate = (pageNumber) => setCurrentPage(pageNumber);

 return (
     <div>
         {/* <NavBar /> */}
         {/* <CreatePokemon /> */}
         <Link to = {`/addPokemon`}>Create Pokemon!!</Link>
         <SearchBar setSearch = {setSearch}/>
         { search ? searchPokemon && <Link to = {`/cardDetail/${searchPokemon.id}`}><Card name = {searchPokemon.name} image = {searchPokemon.image} types = {searchPokemon.types} key = {searchPokemon.id} /></Link>
         :
         (getPokemons.length > 0 ? <Paginate /> : <h2>Loading...</h2>)
           }


     </div>
 )

}

export default Home

