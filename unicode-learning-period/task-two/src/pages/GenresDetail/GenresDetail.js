import React, { useState, useEffect } from 'react';
import '../GenresDetail/GenresDetail.css';

import { Link } from 'react-router-dom';

import axios from 'axios';

const GenresDetail = props => {
  const [token ,setToken] = useState(sessionStorage.getItem("token"));
  const [playlist, setPlaylist] = useState(null);
  const playlistName = window.location.pathname.split('/')[2];
  
  const categoriesEndpointUrl = `https://api.spotify.com/v1/browse/categories/${playlistName}/playlists?country=IN&limit=20&offset=0`;
  const fetchPlaylistHandler = () => {
    console.log(token);
    return axios(categoriesEndpointUrl, {
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
      fetchPlaylistHandler();
    }, []);
    return (
        <>
        <h2 style={{color: 'white', textTransform: 'uppercase', letterSpacing: 6, textAlign: 'center', margin: 'auto', marginBottom: 24}}>{playlistName}</h2>
        <div className="GenresDetail-block">
            {playlist && (
            playlist.data.playlists.items.map(elem => (
                <li key={elem.id}>
                <div className="GenresDetail-block__elem--itemContainer">
                    <Link><img src={elem.images[0].url} width={300} height={300}/></Link>
                    <h3 style={{color: 'white'}}>{elem.name}</h3>
                    <p style={{color: 'gray'}}>{elem.description}</p>
                </div>
                </li>
            ))
            )}
        </div>
        </>
    );
};

export default GenresDetail;