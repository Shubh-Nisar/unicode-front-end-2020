import React from 'react';
import '../NavBar/NavBar.css';
import { NavLink } from 'react-router-dom';

import { AppBar, Typography, Button } from '@material-ui/core';

const NavBar = props => {
    return (
        <div className="NavBar-block">
            <AppBar className="NavBar-block__elem--flexContainer">
                <div className="NavBar-block__elem--headerContainer">
                    <Button color="inherit" className="NavBar-block__elem--button NavBar-block__elem--header"><NavLink to="/home" >Spotify.</NavLink></Button>
                </div>
                <div className="NavBar-block__elem--buttonContainer">
                    <Button color="inherit" className="NavBar-block__elem--button"><NavLink to="/albums" activeClassName="NavBar-block__elem--active">Albums</NavLink></Button>
                    <Button color="inherit" className="NavBar-block__elem--button"><NavLink to="/genres" activeClassName="NavBar-block__elem--active">Genres</NavLink></Button>
                    <Button color="inherit" className="NavBar-block__elem--button"><NavLink to="/artists" activeClassName="NavBar-block__elem--active">Artists</NavLink></Button>
                </div>
            </AppBar>
        </div>
    );
};

export default NavBar;