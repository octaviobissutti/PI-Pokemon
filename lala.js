<div>
             <span>Filter By Type</span>
                <select className="type" name="type"  onChange={filter}>
                    <option value='null'>null</option>
                    {pokemonTypes && pokemonTypes.map((c, index) => (
                    <option value={c.name} key={index} name="c.name">{c.name}</option>
                    ))}
                </select>  
            <span>Filter By Creator</span>
            <select className="type" name="type" onChange={filtApi}>
                    <option value="null">null</option>
                    <option value="all">All</option>
                    <option value="api">Api Poke</option>
                    <option value="db">Created Poke</option>
            </select>        
            <span>Order By</span>
                <select className="type" name="type" key='order' onChange={ordApi}>
                    <option value="null">null</option>
                    <option value="az" name='az'>A - Z</option>
                    <option value="za" name='za'>Z - A</option>
                    <option value="attack+" name='null'>Attack +</option>
                    <option value="attack-" name='null'>Attack -</option>
                    
                </select>  

                 <ul className='filter'>
                {
                    pokemonFiltered && pokemonFiltered.map((pokemon, index)=> (
                       <Link to={`/pokeDetail/${pokemon.id}`} style={{ textDecoration: 'none', color: 'black',}}>
                   <Pokemon key={index} pokemon={pokemon}></Pokemon>
                       </Link> 
                 )) 

              }
                </ul>
            
            
        </div>



 export const filterApi = (creator, array) => (dispatch) => {
    console.log(creator);
    if(creator === 'api') {
     const res = array.filter(c  =>typeof c.id === 'number')
     dispatch({type: FILTER_POKEMON, payload: [...res]})
    }
    if(creator === 'db') {
     const res = array.filter(c  =>typeof c.id === 'string')
     dispatch({type: FILTER_POKEMON, payload: [...res]})
    } 
    if(creator === 'all') {
      dispatch({type: FILTER_POKEMON, payload: [...array]})
    }
    if(creator === 'null') {
      dispatch({type: FILTER_POKEMON, payload: []})
    }
   
  }
   export const orderApi = (condition, array) => (dispatch) => {
    if(condition === 'az') {
      const nombre1 = array.sort((a, b) => {
        const first = a.name;
        const last = b.name;
        if(first < last ){
          return -1;
        } 
        if(first > last) {
          return 1;
        } else {
          return 0;
        }
        
      })
      dispatch({type: FILTER_POKEMON, payload:[...nombre1]})
    }
    if(condition === 'za') {
      const nombre2 = array.sort((a, b) => {
        const first = a.name;
        const last = b.name;
        if(first > last ){
          return -1;
        } 
        if(first < last) {
          return 1;
        } else {
          return 0;
        }
      }) 
      dispatch({type: FILTER_POKEMON, payload:[...nombre2]}) 
    }
    if(condition === 'attack+'){
      const attack = array.sort((a,b) => b.attack - a.attack)
      dispatch({type: FILTER_POKEMON, payload:[...attack]}) 
    }
    if(condition === 'attack-'){
      const attack = array.sort((a,b) => a.attack - b.attack)
      dispatch({type: FILTER_POKEMON, payload:[...attack]}) 
    }
    if(condition === 'null') {
      dispatch({type: FILTER_POKEMON, payload: []})
    }
    
  }