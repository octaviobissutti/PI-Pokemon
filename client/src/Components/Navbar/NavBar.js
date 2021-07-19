import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';


import './NavBar.css';

export const Nav = () => {
  return (
    <div className='nav-container'>
      {/* <div>
        <Link to='/'>
          <img src={Pika} className='nav-logo-img' alt='' />
        </Link>
      </div> */}
      <div className='links-container'>
          <div className='home-link'>
            <Link to='/home'>
              HOME
            </Link>
          </div>
          <div className='create-link'>
            <Link to='/addPokemon'>
              CREATE POKEMON
            </Link>
        </div>
        <Filter />
      </div>
    </div>
  );
};

export default Nav;