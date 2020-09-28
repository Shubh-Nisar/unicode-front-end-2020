import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Albums/Albums.css';

import { Paper } from '@material-ui/core'

const axios = require('axios');

const Album = props => {
  const [token ,setToken] = useState(sessionStorage.getItem("token"));
  const [album, setAlbum] = useState(null);
  
  const albumEndpointUrl = 'https://api.spotify.com/v1/me/albums?offset=0&limit=20';
  const fetchAlbumHandler = () => {
    console.log(token);
    return axios(albumEndpointUrl, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + `${token}`,
      },
    }).then(res => {
      setAlbum(res);
      console.log(res);
    }).catch(err => console.log(err));
    };

    useEffect(() => {
      fetchAlbumHandler();
    }, []);

  return (
    <>
    <h2 style={{color: 'white', marginTop: 100, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 6}}>Albums</h2>
    {album && (
      <div className="Album-block">
        {album.data.items.map(elem => (
          <>
          <Link to={`/albums/${elem.album.id}`}>
          <li key={elem.id}>
            <div className="Album-block__elem--albumContainer">
              <div className="Album-block__elem--albumImageContainer">
                <Paper elevation={15}><img className="Album-block__elem--albumImage" src={elem.album.images[1].url} width={200} height={200}/></Paper>
              </div>
              <div className="Album-block__elem--albumDetailContainer">
                <p>{elem.album.name}</p>
                <span>{elem.album.label}</span>
              </div>
            </div>
          </li>
          </Link>
          </>
        ))}
      </div>
    )}
    </>
  );
}

export default Album;