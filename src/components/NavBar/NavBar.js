import React, { useState, useEffect } from 'react';
import '../NavBar/NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { fade, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { InputBase, AppBar, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ModalButton from '../ModalButton/ModalButton';


const NavBar = props => {
    const CLIENT_ID = '68037404511-7co5o2voja5thcc5m2mu26cq6kfh92k5.apps.googleusercontent.com';
    const [login, setLogin] = useState(false);
    const [profileDp, setProfileDp] = useState();
    const [search, setSearch] = useState(null);
    const onSuccess = (res) => {
        console.log("Success: " + res.getBasicProfile().getImageUrl());
        setProfileDp(res.getBasicProfile().getImageUrl());
        localStorage.setItem("loginTask3", '1');
        setLogin(true);
    };

    const onFailure = (res) => {
        console.log("Failure: " + res.error);
    };
    const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        }},
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputRoot: {
          color: 'inherit',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
   }}))
   const classes = useStyles();

    return (
        <div className="NavBar-block">
            <AppBar className="NavBar-block__elem--flexContainer">
                <div className="NavBar-block__elem--headerContainer">
                    <Button color="inherit" className="NavBar-block__elem--button NavBar-block__elem--header"><NavLink to="/" >Populus XD</NavLink></Button>
                </div>
                <div className={classes.search}>
               <div className={classes.searchIcon}>
              <SearchIcon />
              </div>
              <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(text) => {
                setSearch(text.target.value);
                console.log(text.target.value);
            }}
              />
               <Button 
                        variant="contained" 
                        size="large" 
                        style={{padding: '16px 30px', backgroundColor:'inherit', color: 'white'}}>
                        {(search==''||search==null)?<Link to={`/`}>Go</Link>:
                        <Link to={`/search/${search}`}>Go</Link>}
                    </Button>
             </div>
                <div className="NavBar-block__elem--buttonContainer">
                    <Button color="inherit" className="NavBar-block__elem--button">
                        <ModalButton />
                    </Button>

                    <Button color="inherit" className="NavBar-block__elem--button">
                        <div>
                        {!login ? (<GoogleLogin 
                            clientId={CLIENT_ID}
                            buttonText=""
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            uxMode='redirect'
                            redirectUri="http://localhost:3000/"
                            className="NavBar-block__elem--googleButton"
                        />) : 
                        (<GoogleLogout 
                                clientId={CLIENT_ID}
                                buttonText=""
                                onLogoutSuccess={() => {
                                    console.log("Success!");
                                    setLogin(false);
                                    localStorage.setItem("loginTask3", '0');
                                    console.log(localStorage.getItem("loginTask3"));
                                    setTimeout(() => {
                                        window.location.href = 'http://localhost:3000/';
                                    }, 1);
                                }}
                                className="NavBar-block__elem--googleLogOutButton"
                            ><img src={profileDp} width={40} height={40} style={{borderRadius: 40}}/></GoogleLogout>
                        )}
                        </div>
                    </Button>
                </div>
            </AppBar>
        </div>
    );
};

export default NavBar;