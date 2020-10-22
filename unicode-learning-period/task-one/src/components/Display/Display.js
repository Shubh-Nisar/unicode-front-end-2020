import React from 'react';
import '../Display/Display.css'

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const Display = props => {
    return (
        <>
        <h1>Customer Dashboard</h1>
        <div className="Display-block">
            <div className="Display-block__elem--personal">
                <Paper elevation={3}>
                    <h3>{props.name}</h3>
                    <div className="Display-block__elem--personalGrid">
                        <div>
                            <Avatar className="Display-block__elem--personalGridInitial">{props.name.substring(0, 1).toUpperCase()}</Avatar>
                        </div>
                        <div className="Display-block__elem--personalGridInfo">
                            <p>Number: {props.number}</p>
                            <p>Email: {props.email}</p>
                        </div>
                    </div>
                    <div>
                        <Button variant="outlined" color="primary" size="large" className="Input-block__elem--personalGridFacilities" href="">Privilege</Button>
                        <Button variant="outlined" color="primary" size="large" className="Input-block__elem--personalGridFacilities" href="">KYC</Button>
                        <Button variant="outlined" color="primary" size="large" className="Input-block__elem--personalGridFacilities" href="">Statement</Button>
                    </div>
                </Paper>
            </div>
            <div className="Display-block__elem--loans">
                <Paper elevation={3}>
                    <div>
                        <h3>Loans</h3>
                        <div className="Display-block__elem--loansMarquee">
                            <marquee height={200} direction="up" scrollamount="2">
                            Union Bank of India charges 0.50% of loan amount, Max.Rs 15, 000 <br />
                            *Bank of India charges 0.25 per cent of loan; minimum Rs 1,500 and maximum Rs 20,000 <br />
                            *Central Bank of India charges 0.50% as processing fees subject to maximum up to Rs 20,000 <br />
                            *Bank of Baroda charges 0.25% to 0.50% of loan; Min. Rs.8500/- Max. Rs.25000/- <br />
                            Canara Bank charges 0.50 per cent as processing fees; minimum Rs 1,500 and maximum Rs 10,000 <br />
                            *Punjab & Sindh Bank offers full waiver of processing fess and inspection charges <br />
                            *ICICI Bank charges 0.50% of loan amount as processing fees plus applicable taxes <br />
                            *SBI charges 0.40 per cent plus GST as processing fees. Minimum Rs 10,000 and Maximum Rs 30,000 plus GST. (Exception builder-tie up projects) <br />
                            *IDFC First Bank charges up to Rs 10,000 as processing fees (Additional premium is charged based on risk profile) <br />
                            *PNB charges 0.35 per cent as processing fees; minimum Rs 2,500 and maximum Rs 15,000 plus documentation charges 1,350/- <br />
                            </marquee>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
        
        </>
    );
};

export default Display;