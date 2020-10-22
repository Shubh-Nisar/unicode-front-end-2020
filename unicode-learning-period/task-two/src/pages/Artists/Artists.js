import React, { useState, useEffect } from 'react';
import '../Artists/Artists.css';

import { Avatar } from '@material-ui/core';

const axios = require('axios');

const Rankings = props => {
  const [token ,setToken] = useState(sessionStorage.getItem("token"));
  const [artists, setArtists] = useState(null);
  
  const artistsEndpointUrl = `https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=20`;
  const fetchArtistsHandler = () => {
    console.log(token);
    return axios(artistsEndpointUrl, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + `${token}`,
      },
    }).then(res => {
      setArtists(res);
      console.log(res);
    }).catch(err => console.log(err));
    };

    useEffect(() => {
      fetchArtistsHandler();
    }, []);
    return (
        <>
        <h1 style={{color: 'white', textTransform: 'uppercase', letterSpacing: 6, textAlign: 'center', marginBottom: 24, marginTop: 75}}>Artists</h1>
        <div className="Artists-block">
            {artists && (
                artists.data.artists.items.map(elem => (
                    <li key={elem.id}>
                        <div className="Artists-block__elem--elementContainer">
                            <Avatar src={elem.images[0].url} style={{width: 300, height: 300}}/>
                            <h3 style={{color: 'white', textTransform: 'uppercase', letterSpacing: 3}}>{elem.name}</h3>
                                <div style={{width: 250, paddingLeft: 50}}>
                                <p>{elem.genres.map(genre => (
                                    <li key={genre} style={{color: 'gray', display: 'flex', flexDirection: 'column', flexWrap: "wrap", textTransform: 'capitalize', justifyContent: 'flex-start', alignSelf: 'flex-start'}}>{genre}</li>
                                ))}</p>
                                <p style={{color: 'gray'}}>Followers: {elem.followers.total}</p>
                                <p style={{color: 'gray'}}>Popularity: {elem.popularity}</p>
                                </div>
                        </div>
                    </li>
                ))
            )}
        </div>
        </>
    );
};

export default Rankings;