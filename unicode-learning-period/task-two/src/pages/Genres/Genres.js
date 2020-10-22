import React, { useState, useEffect } from 'react';
import '../Genres/Genres.css';

import { Link } from 'react-router-dom';

import axios from 'axios';
//const axios = require('axios');

const Genres = props => {
  const [token ,setToken] = useState(sessionStorage.getItem("token"));
  const [categories, setCategories] = useState(null);
  
  const categoriesEndpointUrl = 'https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_SE&limit=20&offset=0';
  const fetchCategoriesHandler = () => {
    console.log(token);
    return axios(categoriesEndpointUrl, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + `${token}`,
      },
    }).then(res => {
      setCategories(res);
      console.log(res);
    }).catch(err => console.log(err));
    };

    useEffect(() => {
      fetchCategoriesHandler();
    }, []);

    return (
      <>
      <h1 style={{color: 'white', textTransform: 'uppercase', letterSpacing: 6, textAlign: 'center', marginBottom: 24, marginTop: 75}}>Genres</h1>
      <div className="Genres-block">
        {categories && (
          categories.data.categories.items.map(elem => (
            <li key={elem.id}>
              <div className="Genres-block__elem--itemContainer">
                <Link to={`/genres/${elem.id}`}><img src={elem.icons[0].url}/></Link>
                <h3>{elem.name}</h3>
              </div>
            </li>
          ))
        )}
      </div>
      </>
    );
};

export default Genres;