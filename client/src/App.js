import Landing from "./Components/Landing";
import { Route } from 'react-router-dom';
import Home from "./Components/Home";
import React from "react";


function App() {
  return (
   <React.Fragment>  
     <Route exact path="/" component={Landing} />
     <Route path ="/home" component={Home} />
   </React.Fragment>
    
  );
}

export default App;
