// import { useSelector, useDispatch } from 'react-redux';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Card from '../Card/Card';
// import './Paginate.css';
// import { getAllPokemons } from '../../Redux/Actions/actions';


// export default function Paginate() {
//     let dataLimit = 12;
//     const getPokemons = useSelector((state) => state.getPokemons);
//     const [pages] = useState(Math.ceil(getPokemons.length / dataLimit));

//     const [currentPage, setCurrentPage] = useState(1);

//     const dispatch = useDispatch();


//     function goToNextPage() { 
//         setCurrentPage((pages) => pages + 1)
//     }

//     function goToPreviousPage() {
//         setCurrentPage((pages) => pages - 1);
//     }


//     // useEffect(() => {
//     //    dispatch(getAllPokemons())
//     // }, []);


//     const getPaginatedData = () => {
//         const startIndex = currentPage * dataLimit - dataLimit
//         const endIndex = startIndex + dataLimit
//         return getPokemons.slice(startIndex, endIndex)
//     };    


//     return (
//         <div>
//           <div>
//           <button className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPreviousPage} >Prev</button>       
//           <h5 >Pag: {currentPage}</h5>     
//           <button className={`${currentPage === pages ? 'disabled' : ''}`} onClick={goToNextPage} >Next</button>
//           </div>
//           {getPaginatedData() 
//           .map(poke => (   
//           <ul key = {poke.id}> 
//             <Link  to = {`/cardDetail/${poke.id}`} >          
//               <Card poke = {poke} key = {poke.id} name = {poke.name} image = {poke.image} types = {poke.types}/>
//             </Link>
//           </ul>))
//           }        
//         </div>
//     )
// }