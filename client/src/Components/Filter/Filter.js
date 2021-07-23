import { orderOption, filterPoke, filterTypes } from '../../Redux/Actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import './Filter.css';

function Filter() {
    const filterPokemon = useSelector((state) => state.filterPokemons);
    const allPoke = useSelector((state) => state.getPokemons);
    const types = useSelector((state) => state.getTypes);

    const dispatch = useDispatch();

    function order(e) {
        dispatch(orderOption(e.target.value, allPoke))
      }

    function filterBy(e) {
        dispatch(filterPoke(e.target.value))
    }  
    
    function filterByTypes(e) {
        dispatch(filterTypes(e.target.value))
    }


    return (
        <div>
            <div className = "filter">
            <span> By Creator:</span>
            <select className="type" name="type" onChange={filterBy}>
                    <option value="all">All</option>
                    <option value="api">Pokemon from API</option>
                    <option value="db">Created Pokemon</option>
            </select>     

            <span>Order By:</span>
        <select className = "type" name = "type" key = "order" onChange={order}>
            <option value = "az" name = "az">A - Z</option>
            <option value = "za" name = "za">Z - A</option>
            <option value = "attack+" name = "null">Attack +</option>
            <option value = "attack-" name = "null">Attack -</option>



        </select>

        <div className="filterTypes">
             <span > By Type:</span>
                <select className="type" name="type"  onChange={filterByTypes}>
                    {types && types.map((t, index) => (
                    <option value={t.name} key={index} name="t.name">{t.name}</option>
                    ))}
                </select>  
         </div>       
        </div>

        <ul className = "filter1">
            {
                filterPokemon && filterPokemon.map((poke,index) => (
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



