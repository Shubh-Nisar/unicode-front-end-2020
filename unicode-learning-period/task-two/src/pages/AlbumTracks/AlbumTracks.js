import React, { useState, useEffect } from 'react';
import '../AlbumTracks/AlbumTracks.css';

import { Paper, List, ListItem } from '@material-ui/core';

const axios = require('axios');

const AlbumTracks = props => {
    const [track, setTrack] = useState();
    const albumId = window.location.pathname.split('/')[2];
    console.log(albumId);
    const token = useState(sessionStorage.getItem("token"))[0];
  
    const albumEndpointUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?market=IN&limit=20&offset=0`;
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
      setTrack(res);
      console.log(res);
    }).catch(err => console.log(err));
    };

    useEffect(() => {
      fetchAlbumHandler();
      console.log(track);
    }, []);
    return (
        <div className="AlbumTracks-block">
            <h2>Tracks</h2>
            {track && (
                <List className="AlbumTracks-block__elem--tracksContainer">
                    {track.data.items.map(elem => (
                        <ListItem key={elem.uri}>
                            <div className="AlbumTracks-block__elem--trackInsideContainer">
                                <a href={elem.external_urls.spotify} target="_blank" className="AlbumTracks-block__elem--trackInsideContainerA">
                                    <div>
                                        <h4 style={{color: 'white'}}>{elem.name}</h4>
                                        <p>{elem.artists[0].name} <span style={{color: 'gray'}}>| {parseInt((elem.duration_ms*0.001%3600)/60)}min  {parseInt(elem.duration_ms*0.0001) - parseInt((elem.duration_ms*0.001%3600)/60)}s</span></p>
                                    </div>
                                </a>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default AlbumTracks