import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';
import { getAllPokemons, getAllTypes} from '../../Redux/Actions/actions';
import  { useSelector, useDispatch } from 'react-redux';

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

 return (
     <div>
         <SearchBar setSearch = {setSearch}/>
         { search ? searchPokemon && <Link to = {`/cardDetail/${searchPokemon.id}`}><Card name = {searchPokemon.name} image = {searchPokemon.image} types = {searchPokemon.types} key = {searchPokemon.id} /></Link>
         :
         getPokemons?.map((p) => {
             return (
                <Link to = {`/cardDetail/${p.id}`}><Card name = {p.name} image = {p.image} types = {p.types} key = {p.id} /></Link>
               
             )
            })}

     </div>
 )

}

export default Home

