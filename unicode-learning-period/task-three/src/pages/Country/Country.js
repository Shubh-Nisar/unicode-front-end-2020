import React, { useState, useEffect } from 'react';
import '../Country/Country.css';

import Border from '../../components/Border/Border';

import { GoogleLogin } from 'react-google-login';
import { Avatar, Chip } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
const axios = require('axios');

const Country = props => {
    const totalPopulation = localStorage.getItem('totalPopulation');
    console.log(totalPopulation);
    const countryName = window.location.href.split('/')[3];
    console.log(countryName);
    const [countryData, setCountryData] = useState();
    const fetchCountryData = () => {
        const countryUrl = `https://restcountries.eu/rest/v2/alpha/${countryName}`;
        return axios(countryUrl)
            .then(res => {
                console.log(res);
                setCountryData(res);
            }).catch(err => console.log(err));
    };
    useEffect(() => {
        fetchCountryData();
    }, [countryName]);

    const DoughnutChart = () => {
        const data = {
            datasets: [{
                data: [totalPopulation, countryData.data.population],
                backgroundColor: ['rgba(11,181,255, 0.3)', 'rgba(255, 85, 0, 0.8)']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Current World Population',
                `Current ${countryData.data.name} Population`
            ],
        };
        return (
            <div className="CountryDoughnut-block">
                <p>Population Analysis</p>
                <div>
                <div>
                    <Doughnut 
                    data={data}
                    />
                </div>
                <p style={{fontSize: 18, textAlign: 'left'}}>
                    {countryData.data.name} [{countryData.data.nativeName}] lying in {countryData.data.region}<br />comprises 
                    <span style={{fontWeight: 'bolder'}}>  {(countryData.data.population*100/totalPopulation).toFixed(2)}%</span><br />of World Population.
                </p>
                </div>
            </div>
        );
    };

    const borderCountry = () => {
        const borderArray = [];
        countryData.data.borders.map(elem => borderArray.push(`${elem};`));
        console.log(borderArray);
        let borderCountryUrl = `https://restcountries.eu/rest/v2/alpha?codes=${borderArray.map(elem => elem)}`;
        borderCountryUrl = borderCountryUrl.replace(/,/g, '');
        console.log(borderCountryUrl);
        localStorage.setItem('borderCountryUrl', borderCountryUrl);
        return (
            <Border borderCountryUrl={borderCountryUrl} country={countryData.data.name}/>
        );
    };

    if(localStorage.getItem('loginTask3') === '0'){
        return (
            <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)', overflowX: 'hidden'}}>
                <p style={{paddingTop: '50vh', color: 'white'}}>Please Login to access this part of the page!</p>
            </div>
        );
    }



    return (
        <div className="Country-block">
            {console.log(localStorage.getItem('loginTask3'))}
            {countryData && window.localStorage.getItem("loginTask3") && (<div className="Country-block__elem--countryDetails">
            <div className="Country-block__elem--countryContainer">
                <p className="Country-block__elem--countryName">{countryData.data.name} <img src={countryData.data.flag} width={100} style={{verticalAlign: 'middle', marginBottom: 10, borderRadius: 8, border: 'black 2px solid'}}/></p>
                <p className="Country-block__elem--countryCapital">{countryData.data.capital} | {countryData.data.timezones[0]}</p>
                <p className="Country-block__elem--countryPopulation">{countryData.data.population.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}</p>
                <p>{countryData.data.borders.map(elem => <Chip 
                key={elem} label={elem} 
                style={{margin: 5, fontSize: window.innerWidth > 768 ? 20 : 14, backgroundColor: '#9F9F9D'}}
                component={Link}
                to={`/${elem}`}
                ></Chip>)}</p>
                <hr />
            </div>
            {totalPopulation && (DoughnutChart())}
            {borderCountry()}
            </div>)}
        </div>
    );
};

export default Country;