import React from 'react';

import '../Login/Login.css';

const Login = props => {
    const url = "https://accounts.spotify.com/authorize";
    const cliendId = '907241d526e943cdaddc8fd55c87ccc8';
    const redirectUri = 'http://localhost:3000/home';
    const scopes = [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "playlist-read-private",
        "user-library-read",
        "user-follow-read",
    ];

    const loginUrl = `${url}?client_id=${cliendId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

    return (
        <>
        <div className="Login-block">
            <div className="Login-block__elem--logoContainer">
                <img alt='Logo' src={require('../../assets/gifs/spotify.gif')} className="Login-block__elem--logo"/>
            </div>
            <div className="Login-block__elem--linkContainer">
                <a href={loginUrl} className="Login-block__elem--link">Click to Login!</a>
            </div>
        </div>
        </>
    );
}

export default Login;