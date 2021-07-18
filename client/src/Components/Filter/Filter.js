// import React, {useState, useEffect} from 'react';
import { orderOption } from '../../Redux/Actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function Filter() {
    const filterPoke = useSelector((state) => state.filterPokemons);
    const allPoke = useSelector((state) => state.getPokemons);
    // const types = useSelector((state) => state.getTypes);

    const dispatch = useDispatch();

    function order(e) {
        dispatch(orderOption(e.target.value, allPoke))
      }



    return (
        <div>
            <div className = "filter">
            <span>Order By:</span>
        <select className = "type" name = "type" key = "order" onChange={order}>
            <option value = "null">null</option>
            <option value = "az" name = "az">A - Z</option>
            <option value = "za" name = "za">Z - A</option>
            <option value = "attack+" name = "null">Attack +</option>
            <option value = "attack-" name = "null">Attack -</option>





        </select>
        </div>
        <ul className = "filter1">
            {
                filterPoke && filterPoke.map((poke,index) => (
                 <Link to = {`/cardDetail/${poke.id}`} >
                 <Card key = {index} poke = {poke}  name = {poke.name} image = {poke.image} types = {poke.types}/>
                 </Link>
                )

                )
            }
            
            </ul> 
        </div>
    )
}

export default Filter



