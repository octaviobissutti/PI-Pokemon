import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import CardDetail from '../CardDetail';
import { Link } from 'react-router-dom';
import { getAllPokemons, getAllTypes} from '../../Redux/Actions/actions';
import  { useSelector, useDispatch } from 'react-redux';

function Home() {
const dispatch = useDispatch();
const getPokemons = useSelector((state) => state.getPokemons);
const getTypes = useSelector((state) => state.getTypes);

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

 return (
     <fragment>
         {getPokemons?.map((p) => {
             return (
                <Link to = {`/cardDetail/${p.id}`}><Card name = {p.name} image = {p.image} types = {p.types} key = {p.id} /></Link>
               
             )
         })}
     </fragment>
 )







}

export default Home

//ACÁ TENGO QUE MOSTRAR:
//40 POKEMON(DESPUES PAGINARLOS DE A 12).
//IMAGEN, NOMBRE Y TIPOS.
//SEARCHBAR PARA ENCONTRAR POKEMON.