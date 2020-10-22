import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormGroup, FormControlLabel,Switch } from '@material-ui/core';
const axios = require('axios');

const Search = props => {
    const searchName1 = window.location.pathname.split('/')[2];
    let searchName;
    searchName1.includes('%20') ? (searchName = searchName1.replace(/%20/g,' ')):(searchName = searchName1)
    let flag=true;
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
    let [count, setCount] = useState(1);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

      const theme = React.useMemo(
      () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
     [prefersDarkMode],
     );
     const useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width:'100%'
        },
        }));
      const classes = useStyles();      
    const [state, setState] = useState({
        prefersDarkMode: false,
      });
        
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      
    useEffect(() => {
        fetchWorldData();
    }, []);
    if(data){
      data.map(elem =>{
        (elem.name.toLowerCase() != searchName.toLowerCase() || elem.capital.toLowerCase() != searchName.toLowerCase()) &&
        flag++
        console.log(flag);
        return (flag)
      }
    )
    }
    if(data){
      data.map(elem =>{
        (elem.name.toLowerCase() == searchName.toLowerCase() || elem.capital.toLowerCase() == searchName.toLowerCase()) &&
        flag--
        console.log(flag);
        return (flag)
      }
    )
    }
    console.log(prefersDarkMode)
    return (
        <ThemeProvider theme={theme}>
         <div className={classes.root}> 
        <div className='Home-block'>
            <Typography align="right" variant="subtitle2">Dark mode: Off &nbsp;&nbsp;
            <FormControlLabel
           control={
           <Switch
            checked={state.prefersDarkMode}
            onChange={handleChange}
            name="prefersDarkMode"
            color="primary"
          />
        }
        label="On"
      /></Typography>
            {data && (
                data.map(elem => <div>
                    {(elem.name.toLowerCase()==searchName.toLowerCase() || elem.capital.toLowerCase()==searchName.toLowerCase()) && (
                      <TableContainer className={classes.root} component={Paper}>
                      <Table aria-label="simple table" style={{minWidth: 650}}>
                      <TableHead className={classes.root} style={{borderBottom: '2px #333 solid'}}>
                <TableRow>
                <TableCell align="right">Sr. no.</TableCell>   
                <TableCell component="th" scope="row">Name</TableCell>
                <TableCell align="right">Population</TableCell>
                <TableCell align="right">Capital</TableCell>
                <TableCell align="right">Currency</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    <TableRow className={classes.root} key={elem.population} component={Link} to={`/${elem.alpha3Code}`}>
                    <TableCell align="right">{count++}.</TableCell>
                    <TableCell component="th" scope="row">{elem.name}</TableCell>
                    <TableCell align="right">{elem.population.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}</TableCell>
                    <TableCell align="right">{elem.capital}</TableCell>
                    <TableCell align="right">{elem.currencies[0].symbol} {elem.currencies[0].name}</TableCell></TableRow> 
                    </TableBody></Table>
                   </TableContainer>)
                }    
                </div>
                ))}
                
            {(flag>250) && <h1 styling={{color:'black',margin:'auto'}}> Sorry! Couldn't find any search results for "{searchName}" :(</h1>}
        </div></div></ThemeProvider>
    );


















};
export default Search;