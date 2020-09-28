import React, { useState, useEffect } from 'react';
import '../Home/Home.css';
import { Link } from 'react-router-dom';

import { Avatar, Typography, Paper, TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const axios = require('axios');

const Home = props => {
    const _token = window.location.hash;

    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [response, setResponse] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [search, setSearch] = useState(null);

    const userEndpointUrl = 'https://api.spotify.com/v1/me';
    const playlistEndpointUrl = 'https://api.spotify.com/v1/me/playlists?offset=0&limit=20';

    const tokenFetch = () => {
        //setToken(_token);
        console.log(token);
        var res = _token.split("&");
        //console.log(res[0]);
        res = res[0] + '=';
        res = res.split("=");
        console.log(res[1]);
        setToken(res[1]);
        sessionStorage.setItem('token', token);
        console.log(token);
        window.location.hash = "";
    };

    const fetchUserDataHandler = async () => {
        return axios(userEndpointUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
            },
        }).then(res => {
            setResponse(res);
            console.log(res);
        }).catch(err => console.log(err));
    };

    const fetchUserPlaylists = async () => {
        return axios(playlistEndpointUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
            },
        }).then(res => {
            setPlaylist(res);
            console.log(res);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        tokenFetch();
    }, [_token]);
      
    if(token){
        fetchUserDataHandler();
        fetchUserPlaylists();
    }

    return (
        <>
        <div className="Home-block">
            {response && (
            <div className="Home-block__elem--container">
                <div className="Home-block__elem--leftContainer">
                    <div className="Home-block__elem--imageContainer">
                        <Avatar alt={response.data.id} src={response.data.images[0].url} className="Home-block__elem--image"></Avatar>
                    </div>
                    <hr />
                    <div className="Home-block__elem--textContainer">
                    <Typography variant='h3' style={{color: 'white'}} className='Home-block__elem--text'>{response.data.display_name}</Typography>
                    <Typography variant='h5' style={{color: 'grey'}} className='Home-block__elem--text'>Followers: {response.data.followers.total}</Typography>
                    <a href={response.data.external_urls.spotify} target='_black' className='Home-block__elem--text'>Open Spotify Account</a>
                    </div>
                    <div className="Home-block__elem--promoContainer">
                        <img alt='promo' src={require('../../assets/gifs/spotify_promo_01.gif')} className="Home-block__elem--promo"/>
                    </div>
                </div>
                <div className="Home-block__elem--rightContainer">
                    <h3>Search</h3>
                    <div className="Home-block__elem--searchContainer">
                    <TextField 
                        id="outlined-basic" 
                        label="Search" 
                        variant="outlined" 
                        placeholder="Search..."
                        className="Home-block__elem--searchField"
                        onChange={(text) => {
                            setSearch(text.target.value);
                            console.log(text.target.value);
                        }}
                    />
                    <Button 
                        variant="contained" 
                        size="large" 
                        style={{padding: '16px 30px', backgroundColor: '#1DB954', color: 'white'}}>
                            <Link to={`/search/${search}`}>Search</Link>
                    </Button>
                    </div>
                    {playlist && (
                        <div className="Home-block__elem--playlistContainer">
                            <h3>My Playlists</h3>
                                <div className="Home-block__elem--playlistIndividualContainer">
                                {playlist.data.items.map(elem => <li key={elem.name}>
                                    <div className="Home-block__elem--playlistImage">
                                        <a href={elem.external_urls.spotify} target="_blank"><img src={elem.images[0].url} alt={elem.name} width={200} /></a>
                                        <p style={{color: 'white'}}>{elem.name} <span style={{color: 'gray'}}> [{elem.owner.display_name}]</span></p>
                                    </div>
                                </li>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default Home;