import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "#222426", color: "white"}}>
      <Link to="/" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white"}}> Home </div>
      </Link>
      <Link to="/knn" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white", textDecoration: "none"}}> KNN </div>
      </Link>
      <Link to="/rnn" style={{textDecoration: "none"}}>
        <div style={{padding: "12px", color: "white", textDecoration: "none"}}> RNN+LSTM </div>
      </Link>
    </div>
  );
};

export default Header;
