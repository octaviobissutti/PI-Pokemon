import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';
import { getAllPokemons, getAllTypes} from '../../Redux/Actions/actions';
import  { useSelector, useDispatch } from 'react-redux';
import CreatePokemon from '../CreatePokemon/CreatePokemon';
// import NavBar from '../Navbar/NavBar';
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


// useEffect(() => {
//     if(!searchPokemon) {
//         alert('Pokemon not found :(');
//     }
// }, [searchPokemon])


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
     <div className = "home">
         <div> 
         {/* <NavBar /> */}
         {/* <CreatePokemon /> */}
         <SearchBar setSearch = {setSearch}/>
         <div className = "filter-home">
         <Filter />
         </div>
         </div>
         <div className = "container">
         { search ? searchPokemon && <Link className="link" to = {`/cardDetail/${searchPokemon.id}`} ><Card name = {searchPokemon.name} image = {searchPokemon.image} types = {searchPokemon.types} key = {searchPokemon.id} /></Link>
         :
         (currentPokemons.length > 0 && currentPokemons.map((pokemon)=> (
            <Link className="link" to = {`/cardDetail/${pokemon.id}`}><Card name = {pokemon.name} image = {pokemon.image} types = {pokemon.types} key = {pokemon.id} /></Link>)
    )) 
    }
    </div>
    <div className = "paginate">
        <button className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={() => {prePage()}}>Previous</button>
        <h5 >Pag: {currentPage}</h5>     
        <button className={`${currentPage === pageNumber ? 'disabled' : ''}`} onClick={() => {nextPage()}}>Next</button>
    </div>

    
</div>
 )


}

export default Home

