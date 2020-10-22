import React, { useState, useEffect } from 'react';
import '../ModalButton/ModalButton.css';

import { Modal, Fade, Backdrop } from '@material-ui/core';
import { Polar, Bar } from 'react-chartjs-2';
const axios = require('axios');

const ModalButton = props => {
    const [open, setOpen] = useState(false);
    const [topTenData, setTopTenData] = useState();
    let populationArray = [];
    let countryNameArray = [];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var colorArray = ['rgba(250, 130, 62, 0.8)', 'rgba(15, 76, 129, 0.8)', 'rgba(254,74,73,0.8)', 'rgba(42,183,202,0.8)', 'rgba(254,215,102,0.8)', 'rgba(246,171,182, 0.8)', 'rgba(190,155,123,0.8)', 'rgba(99,172,229,0.8)'];

    const worldAnalysis = () => {
        const worldUrl = 'https://restcountries.eu/rest/v2/all';
        return axios(worldUrl).then(res => {
            console.log(res);
            setTopTenData(res);
        }).catch(err => console.log(err));
    };

    const dataProcessAndDisplay = () => {
        topTenData.data.sort((a,b) => b.population-a.population).slice(0, 8).sort((i) => .5 - Math.random(i)).map(elem => (
            <>
            {countryNameArray.push(elem.name)}
            {populationArray.push(elem.population)}
            </>
        ))
        const data = {
            datasets: [{
                data: populationArray,
                backgroundColor: colorArray,
                label: 'Current Stats',
            }],
            labels: countryNameArray,
        };
        return (
            <>
            {window.innerWidth > 900 ? <Polar data={data}/> : <Bar data={data}/>}
            </>
        );
    }

    useEffect(() => {
        worldAnalysis();
    }, []);

    return (
        <div>
        <button type="button" onClick={handleOpen} style={{backgroundColor: 'transparent', border: 'none', color: '#fff', textTransform: 'uppercase', fontWeight: 'bolder', marginBottom: 7}}>
            World Stats
        </button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open} style={{backgroundColor: '#eee'}}>
            <div className="ModalButton-block">
                <h2 id="transition-modal-title">World Statistical Data</h2>
                <p id="transition-modal-description">
                    {topTenData && (dataProcessAndDisplay())}
                </p>
            </div>
            </Fade>
        </Modal>
        </div>
    );
};

export default ModalButton;