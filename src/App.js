import React from "react";
import logo from "./logo.svg";
import Home from "./pages/home";
import Game from "./pages/game";
import CreateGame from "./pages/creategame";
import SignIn from "./components/signin";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <SignIn>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game/:id?" component={Game} />
          <Route exact path="/creategame" component={CreateGame} />
        </Switch>
      </SignIn>
    </Router>
  );
}

export default App;
