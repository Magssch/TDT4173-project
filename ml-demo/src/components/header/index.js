import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ display: "flex"}}>
      <Link to="/">
        <div style={{padding: "12px"}}> Home </div>
      </Link>
      <Link to="/knn">
        <div style={{padding: "12px"}}> KNN </div>
      </Link>
      <Link to="/rnn">
        <div style={{padding: "12px"}}> RNN+LSTM </div>
      </Link>
    </div>
  );
};

export default Header;
