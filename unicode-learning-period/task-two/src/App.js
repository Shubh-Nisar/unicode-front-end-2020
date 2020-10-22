import React, { useState, useEffect } from 'react';

import NavBar from '../src/components/NavBar/NavBar';
import Home from '../src/pages/Home/Home';
import Genres from './pages/Genres/Genres';
import GenresDetail from './pages/GenresDetail/GenresDetail';
import Albums from './pages/Albums/Albums';
import AlbumTracks from './pages/AlbumTracks/AlbumTracks';
import Artists from './pages/Artists/Artists';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//document.title = "Spotify";

function App() {

  return (
    <Router>
      <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home}/>
        <Route exact path="/genres" component={Genres}/>
        <Route path="/genres/:id" component={GenresDetail}/>
        <Route exact path="/albums" component={Albums}/>
        <Route path="/albums/:tracks" component={AlbumTracks}/>
        <Route path="/artists" component={Artists}/>
        <Route path="/search/:searchName" component={Search}/>
      </Switch> 
      </div>
    </Router>
  );
}

export default App;
