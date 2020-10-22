import React, { useState, useEffect } from 'react';
import '../Home/Home.css';

import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
const axios = require('axios');

const Home = props => {
    const [data, setData] = useState();
    let totalPopulation = 0;
    const fetchWorldData = () => {
        const worldUrl = 'https://restcountries.eu/rest/v2/all';
        return axios(worldUrl)
            .then(res => {
                console.log(res.data.sort((a,b) => a-b));
                setData(res.data.sort((a,b) => b.population-a.population));
                res.data.map(elem => totalPopulation += elem.population);
                console.log(totalPopulation.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                localStorage.setItem('totalPopulation', totalPopulation);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchWorldData();
    }, []);
    if(data){
    }
    return (
        <div className='Home-block'>
            <TableContainer component={Paper}>
            <Table aria-label="simple table" style={{minWidth: 650}}>
            <TableHead style={{backgroundColor: '#eee', borderBottom: '2px #333 solid'}}>
                <TableRow>
                <TableCell component="th" scope="row">Name</TableCell>
                <TableCell align="right">Population</TableCell>
                <TableCell align="right">Capital</TableCell>
                <TableCell align="right">Currency</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {data && (
                data.map(elem => <TableRow key={elem.population} component={Link} to={`/${elem.alpha3Code}`}>
                    <TableCell component="th" scope="row">{elem.name}</TableCell>
                    <TableCell align="right">{elem.population.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}</TableCell>
                    <TableCell align="right">{elem.capital}</TableCell>
                    <TableCell align="right">{elem.currencies[0].symbol} {elem.currencies[0].name}</TableCell>
                </TableRow>)
                )}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default Home;