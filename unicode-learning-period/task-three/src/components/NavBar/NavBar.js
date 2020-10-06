import React, { useState, useEffect } from 'react';
import '../NavBar/NavBar.css';
import { NavLink } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { AppBar, Typography, Button } from '@material-ui/core';

const NavBar = props => {
    const CLIENT_ID = '680XXXX4511-7co5o2XXXX5thcc5m2mu2XXXXkfh92k5.apps.googleusercontent.com';
    const [login, setLogin] = useState(false);
    const [profileDp, setProfileDp] = useState();

    const onSuccess = (res) => {
        console.log("Success: " + res.getBasicProfile().getImageUrl());
        setProfileDp(res.getBasicProfile().getImageUrl());
        localStorage.setItem("loginTask3", '1');
        setLogin(true);
    };

    const onFailure = (res) => {
        console.log("Failure: " + res.error);
    };

    return (
        <div className="NavBar-block">
            <AppBar className="NavBar-block__elem--flexContainer">
                <div className="NavBar-block__elem--headerContainer">
                    <Button color="inherit" className="NavBar-block__elem--button NavBar-block__elem--header"><NavLink to="/" >Populus XD</NavLink></Button>
                </div>
                <div className="NavBar-block__elem--buttonContainer">
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