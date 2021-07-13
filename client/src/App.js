import Landing from "./Components/Landing";
import { Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import React from "react";
import CardDetail from "./Components/CardDetail";


function App() {
  return (
   <React.Fragment>  
     <Route exact path="/" component={Landing} />
     <Route path ="/home" component={Home} />
     <Route path = "/cardDetail/:id" exact component = {CardDetail} />
   </React.Fragment>
    
  );
}

export default App;
