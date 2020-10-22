import React, { useState } from 'react';
import '../Input/Input.css';

import Display from '../Display/Display';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';

document.title = 'ICICI | Home'

const Input = props => {
    const [displayComponent, setDisplayComponent] = useState(false); 

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [atm, setAtm] = useState('');

    const [nameValid, setNameValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [atmValid, setAtmValid] = useState(false);

    if(displayComponent){
        return (
            <Display name={name} number={number} email={email}/>
        );
    }

    return (
        <>
        <h1>ICICI Customer Sign-Up</h1>
        <div className='Input-block'>
            <marquee direction="left">ICICI respects and protects the privacy of it's genuine customers. Please follow good internet banking ways to ensure safe and secure internet banking transactions.</marquee>
            <form onSubmit={e => {
                e.preventDefault();
                console.log('Form Submit');
                if(nameValid && numberValid && emailValid && atmValid){
                    setDisplayComponent(true);
                }
            }}>
                <div className='Input-block__elem--form'>
                    <div className='Input-block__elem--formElement'>
                        <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        placeholder="Name"  
                        value={name}
                        //error={name === ''} 
                        onChange={text => setName(text.target.value)}
                        onBlur={() => {
                            var criteria = /^([A-Za-z ])+$/g;
                            if(!name.match(criteria)){
                            console.log("Invalid Name");
                            document.getElementById('nameError').style.display = '';
                            setTimeout(() => {document.getElementById('nameError').style.display = 'none'}, 4000);
                            setNameValid(false);
                            }
                            else {
                                document.getElementById('nameError').style.display = 'none';
                                setNameValid(true);
                            }
                        }}
                        />
                        <Alert severity="error" style={{marginTop: 15, display: 'none'}} id="nameError">Error: Make valid entry</Alert>
                    </div>
                    <div className='Input-block__elem--formElement'>
                        <TextField 
                        id="outlined-basic" 
                        label="Phone Number" 
                        variant="outlined" 
                        placeholder="Phone Number"
                        value={number}
                        onChange={text => setNumber(text.target.value)}
                        onBlur={() => {
                            var criteria = /^\d{10}$/g;
                            if(!number.match(criteria)){
                            console.log("Invalid Number");
                            document.getElementById('numberError').style.display = '';
                            setTimeout(() => {document.getElementById('numberError').style.display = 'none'}, 4000);
                            setNumberValid(false);
                            }
                            else {
                                document.getElementById('numberError').style.display = 'none';
                                setNumberValid(true);
                            }
                        }}
                        />
                        <Alert severity="error" style={{marginTop: 15, display: 'none'}} id="numberError">Error: Make valid entry</Alert>
                    </div>
                    <div className='Input-block__elem--formElement'>
                        <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        placeholder="Email"
                        type='email'
                        value={email}
                        onChange={text => setEmail(text.target.value)}
                        onBlur={() => {
                            var criteria = /^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)\.([a-zA-Z]{2,5})$/g;
                            if(!email.match(criteria)){
                            console.log("Invalid Email");
                            document.getElementById('emailError').style.display = '';
                            setTimeout(() => {document.getElementById('emailError').style.display = 'none'}, 4000);
                            setEmailValid(false);
                            }
                            else {
                                document.getElementById('emailError').style.display = 'none';
                                setEmailValid(true);
                            }
                        }}
                        />
                        <Alert severity="error" style={{marginTop: 15, display: 'none'}} id="emailError">Error: Make valid entry</Alert>
                    </div>
                    <div className='Input-block__elem--formElement'>
                        <TextField 
                        id="outlined-basic" 
                        label="ATM PIN" 
                        variant="outlined" 
                        placeholder="ATM PIN" 
                        type="password"
                        value={atm}
                        onChange={text => setAtm(text.target.value)}
                        onBlur={() => {
                            var criteria = /^\d{6}$/g;
                            if(!atm.match(criteria)){
                            console.log("Invalid ATM-PIN");
                            document.getElementById('atmError').style.display = '';
                            setTimeout(() => {document.getElementById('atmError').style.display = 'none'}, 4000);
                            setAtmValid(false);
                            }
                            else {
                                document.getElementById('atmError').style.display = 'none';
                                setAtmValid(true);
                            }
                        }}
                        />
                        <Alert severity="error" style={{marginTop: 15, display: 'none'}} id="atmError">Error: Make valid entry</Alert>
                    </div>
                </div>
                <div className='Input-block__elem--formBtnContainer'>
                <Button variant="contained" color="primary" size="large" type="submit" className="Input-block__elem--formBtn">Submit</Button>
                </div>
            </form>
            <div className="Input-block__elem--tips">
                <h3>Customer's Cyber-Security</h3>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Always log-out of the system once you are done using it."/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Avoid Using Public Wi-Fi or Use VPN software"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Change your password regularly and ensure it's a strong one"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Do not use public computers to login to net banking"/>
                    </ListItem>
                </List>
                <div className="Input-block__elem--tipsCall">
                    <Button variant="outlined" color="primary" size="large" className="Input-block__elem--tipsCallBtn" href="tel:18002135577">1800 213 5577</Button>
                    <Button variant="outlined" color="primary" size="large" className="Input-block__elem--tipsCallBtn" href="tel:18002145577">1800 214 5577</Button>
                    <Button variant="outlined" color="primary" size="large" className="Input-block__elem--tipsCallBtn" href="tel:18001098080">1800 109 8080</Button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Input;
