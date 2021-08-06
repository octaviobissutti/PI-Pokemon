import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getById } from "../../Redux/Actions/actions";
import Card from "../Card/Card";
import SearchBar from "../Searchbar/SearchBar";
import './CardDetail.css';

function CardDetail({ match }) {
  const dispatch = useDispatch();
  const getDetails = useSelector((state) => state.getDetails);
  const fixedMatch = useRef(match.params.id);


  useEffect(() => {
    dispatch(getById(fixedMatch.current));
  }, [dispatch]);
  console.log(getDetails);

  return (
      <div>
        <SearchBar  detail = {true} />
    <div className = "div-detail">
    {
      <Card key = {getDetails.id} 
      name = {getDetails.name}
      types = {getDetails.types}
      height = {getDetails.height}
      weight = {getDetails.weight}
      image = {getDetails.image}
      hp = {getDetails.hp}
      attack = {getDetails.attack}
      defense = {getDetails.defense}
      speed = {getDetails.speed} 
      />
      
    }
    </div>
    </div>
  ) 
}

export default CardDetail;

