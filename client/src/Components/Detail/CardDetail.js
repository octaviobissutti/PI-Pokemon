import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearDetail, getById } from "../../Redux/Actions/actions";
import Card from "../Card/Card";
import SearchBar from "../Searchbar/SearchBar";
import "./CardDetail.css";

function CardDetail({ match }) {
  const dispatch = useDispatch();
  const getDetails = useSelector((state) => state.getDetails);

  const fixedMatch = useRef(match.params.id);

  useEffect(() => {
    dispatch(getById(fixedMatch.current));
    return (() => dispatch(clearDetail()));
  }, [dispatch]);

  return (
    <div>
      <SearchBar detail={true} />
        
        {
          getDetails.length !== 0  ?
      <div className="div-detail">
           
          <Card
            key={getDetails.id}
            name={getDetails.name}
            types={getDetails.types}
            height={getDetails.height}
            weight={getDetails.weight}
            image={getDetails.image}
            hp={getDetails.hp}
            attack={getDetails.attack}
            defense={getDetails.defense}
            speed={getDetails.speed}
          />
          
          </div>
          : <img className = "loading" src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ecd5fab-be8d-4409-bd84-4a3d205b9ec8/daehq7e-48b7f14a-14ff-4082-9e7c-aee710c9bbfd.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlY2Q1ZmFiLWJlOGQtNDQwOS1iZDg0LTRhM2QyMDViOWVjOFwvZGFlaHE3ZS00OGI3ZjE0YS0xNGZmLTQwODItOWU3Yy1hZWU3MTBjOWJiZmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GW_7jlunpf-1g4Dy3ppLR414Q_YBZ6MxF9QAVlbV4Ck" alt = "not found"/> 
        }
     
    </div>
    
  );
}

export default CardDetail;
