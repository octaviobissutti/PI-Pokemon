import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';
import { getAllPokemons, getAllTypes} from '../../Redux/Actions/actions';
import  { useSelector, useDispatch } from 'react-redux';
// import CreatePokemon from '../CreatePokemon/CreatePokemon';
// import NavBar from '../Navbar/NavBar';
// import Paginate from '../Paginate/Paginate';
import Filter from '../Filter/Filter';
import './Home.css';

function Home() {

const dispatch = useDispatch();
const getPokemons = useSelector((state) => state.getPokemons);
const getTypes = useSelector((state) => state.getTypes);
const searchPokemon = useSelector((state) => state.searchPokemon);



const [search, setSearch] = useState(false);

useEffect(() => {
    
 dispatch(getAllPokemons())
    
},[dispatch])

useEffect(() => {
    if(getTypes) {
        dispatch(getAllTypes())
    }
}, [dispatch])


useEffect(() => {
    if(!searchPokemon) {
        alert('Pokemon not found :(');
    }
}, [searchPokemon])


const [currentPage, setCurrentPage] = useState(1);
const [pokemonsPerPage] = useState(12);


const indexOfLastPost = currentPage * pokemonsPerPage;
const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
const currentPokemons = getPokemons.slice(indexOfFirstPost, indexOfLastPost);

const pageNumber = Math.ceil(getPokemons.length / pokemonsPerPage);

const nextPage = () => {
    if(currentPage < pageNumber) setCurrentPage(currentPage + 1);
    else setCurrentPage(1)
}

const prePage = () => {
    if(currentPage !== 1)  setCurrentPage(currentPage - 1);
    else setCurrentPage(pageNumber)
}


 return (
     <div>
         <div>
         <Filter />
         {/* <NavBar /> */}
         {/* <CreatePokemon /> */}
         <Link to = {`/addPokemon`}>Create Pokemon!!</Link>
         <SearchBar setSearch = {setSearch}/>
         </div>
         <div>
         { search ? (searchPokemon && <Link to = {`/cardDetail/${searchPokemon.id}`}><Card name = {searchPokemon.name} image = {searchPokemon.image} types = {searchPokemon.types} key = {searchPokemon.id} /></Link>)
         :
         (currentPokemons.length > 0 && currentPokemons.map((pokemon)=> (
            <Link to = {`/cardDetail/${pokemon.id}`}><Card name = {pokemon.name} image = {pokemon.image} types = {pokemon.types} key = {pokemon.id} /></Link>)
    )) 
    }
    </div>
    <div>
        <button className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={() => {prePage()}}>Previous</button>
        <button className={`${currentPage === pageNumber ? 'disabled' : ''}`} onClick={() => {nextPage()}}>Next</button>
    </div>
    {/* className={`${currentPage === 1 ? 'disabled' : ''}`} */}

    
</div>
 )


}

export default Home

