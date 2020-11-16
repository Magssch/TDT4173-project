import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NaiveBayes from "./pages/NB";
import Header from "./components/header";
import KNeighbors from "./pages/KNN";
import Recurrent from "./pages/RNN";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route path="/nb">
            <NaiveBayes/>
          </Route>
          <Route path="/knn">
            <KNeighbors/>
          </Route>
          <Route path="/rnn">
            <Recurrent/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
