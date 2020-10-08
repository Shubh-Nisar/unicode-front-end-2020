import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
const axios = require('axios');

const Border = props => {
    const currentCountry = props.country;
    let populationArray = [];
    let countryNameArray = [];
    const [borderData, setBorderData] = useState();
    console.log(props.borderCountryUrl);

    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const borderAnalysis = () => {
        const borderCountryUrl = props.borderCountryUrl;
        return axios(borderCountryUrl).then(res => {
            console.log(res);
            setBorderData(res);
        }).catch(err => console.log(err));
    };

    const dataProcessAndDisplay = () => {
        borderData.data.map(elem => (
            <>
            {countryNameArray.push(elem.alpha3Code)}
            {populationArray.push(elem.population)}
            </>
        ))
        const data = {
            datasets: [{
                data: populationArray,
                backgroundColor: colorArray,
                label: `Border Countries to ${currentCountry}`,
            }],
            labels: countryNameArray,
        };

        return (
            <>
            <hr />
            <p style={{letterSpacing: '0.1vw', fontSize: window.innerWidth > 600 ? '3vw' : '8vw'}}>BORDER ANALYSIS</p>
            <Bar 
            data={data}
            />
            </>
        );
    };

    useEffect(() => {
        borderAnalysis();
    }, [props.borderCountryUrl]);
    return (
        <div>
            <div style={{width: '90%', textAlign: 'center', margin: 'auto'}}>
                {borderData && (dataProcessAndDisplay())}
            </div>
        </div>
    );
};

export default Border;