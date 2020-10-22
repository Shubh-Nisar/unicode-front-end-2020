import React, { useState, useEffect } from 'react';
import '../Search/Search.css';

import { List, ListItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const axios = require('axios');

const Search = props => {
    const searchName = window.location.pathname.split('/')[2];
    const searchEndpointUrl = `https://api.spotify.com/v1/search?q=${searchName}&type=track%2Cartist%2Calbum&market=IN&limit=10&offset=0`;
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [searchResult, setSearchResult] = useState();

    const getSearchHandler = () => {
        console.log(token);
        return axios(searchEndpointUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
            },
        }).then(res => {
            setSearchResult(res);
            console.log(res);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        if(token && searchName){
            getSearchHandler();
        }
    }, []);

    return (
        <>
        <h2 style={{color: 'white', textTransform: 'uppercase', letterSpacing: 6, textAlign: 'left', margin: 'auto 16px', marginBottom: 24}}>{searchName.split('%20')[0]} {searchName.split('%20')[1]} Results</h2>
        <div className="Search-block">
            {searchResult && (
                <List className="AlbumTracks-block__elem--tracksContainer">
                    {searchResult.data.albums.items.map(elem => (
                        <ListItem key={elem.uri}>
                            <div className="AlbumTracks-block__elem--trackInsideContainer">
                                <a href={elem.external_urls.spotify} target="_blank" className="Search-block__elem--trackInsideContainerA">
                                    <div>
                                        <img src={elem.images[0].url} width={200} height={200}/>
                                    </div>
                                    <div>
                                        <h4>{elem.name}</h4>
                                        <p>{elem.artists[0].name}</p>
                                        <span>Release Date: {elem.release_date}</span>
                                    </div>
                                </a>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
        </>
    );
};

export default Search;