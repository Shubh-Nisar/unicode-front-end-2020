import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Country from './pages/Country/Country';
import Search from './pages/Search/Search';
function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:name" component={Country}/>
        <Route path="/search/:searchName" component={Search}/>
      </Switch> 
      </div>
    </Router>
  );
}

export default App;
