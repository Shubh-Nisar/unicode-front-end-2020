import { isInaccessible } from '@testing-library/react';
import React, { useState, useEffect } from 'react';

import { GoogleLogin } from 'react-google-login';
const axios = require('axios');

const Country = props => {
    const countryName = window.location.href.split('/')[3];
    console.log(countryName);
    const [countryData, setCountryData] = useState();
    const fetchCountryData = () => {
        const countryUrl = `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`;
        return axios(countryUrl)
            .then(res => {
                console.log(res);
                setCountryData(res);
            }).catch(err => console.log(err));
    };
    useEffect(() => {
        fetchCountryData();
    }, [countryName]);

    if(localStorage.getItem('loginTask3') === '0'){
        return (
            <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                <p style={{paddingTop: '50vh', color: 'white'}}>Please Login to access this part of the page!</p>
            </div>
        );
    }
    return (
        <div className="Country-block">
            {console.log(localStorage.getItem('loginTask3'))}
            {countryData && window.localStorage.getItem("loginTask3") && (<div className="Country-block__elem--countryDetails">
            <p style={{fontSize: 100}}>{countryData.name}</p>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            </div>)}
        </div>
    );
};

export default Country;