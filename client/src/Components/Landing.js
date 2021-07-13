import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="bg-go">
      <Link to="/home">
        <button className="btn-grad"> GET STARTED </button>
      </Link>
  
    </div>
  );
}

export default Landing;
