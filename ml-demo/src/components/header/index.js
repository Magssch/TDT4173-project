import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "#222426", color: "white", position: "fixed", width: "100%"}}>
      <Link to="/" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white"}}> Home </div>
      </Link>
      <Link to="/knn" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white", textDecoration: "none"}}> k-Nearest Neighbors </div>
      </Link>
      <Link to="/rnn" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white", textDecoration: "none"}}> Recurrent Neural Network and Long Short-Term Memory </div>
      </Link>
    </div>
  );
};

export default Header;
