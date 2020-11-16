import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NaiveBayes from "./pages/NB";
import Header from "./pages/components/header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <div>Hello world</div>
          </Route>
          <Route path="/nb">
            <NaiveBayes/>
          </Route>
          <Route path="/knn">
            <div>K-nearest neighbors</div>
          </Route>
          <Route path="/rnn">
            <div>Recurrent Neural Network with LSTM</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
