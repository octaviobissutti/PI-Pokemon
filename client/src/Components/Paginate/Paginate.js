import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';


export default function Paginate() {
    let dataLimit = 12;
    const getPokemons = useSelector((state) => state.getPokemons);
    // const [pages] = useState(Math.round(getPokemons.length / dataLimit));

    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() { 
        setCurrentPage((pages) => pages + 1)
    }

    function goToPreviousPage() {
        setCurrentPage((pages) => pages - 1);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return getPokemons.slice(startIndex, endIndex)
    };    

    /* const paginate = (pageNumber) => setCurrentPage(pageNumber); */

    return (
        <div>
          <button onClick={goToPreviousPage} >Prev</button> 
           
          <button onClick={goToNextPage} >Next</button>

          {getPaginatedData().map(poke => (   
          <ul key = {poke.id}> 
            <Link  to = {`/cardDetail/${poke.id}`} /* mostrar el res de getDetails */ >          
              <Card poke = {poke} key = {poke.id} name = {poke.name} image = {poke.image} types = {poke.types}/>
            </Link>
          </ul>))}        
        </div>
    )
}