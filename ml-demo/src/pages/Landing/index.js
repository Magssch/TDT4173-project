import React from 'react';
import logo from './stackoverflow.png';
import { Box } from '@material-ui/core';

const Landing = () =>{
    return (
        <Box my={5} display={"flex"} flexDirection={"column"}>
            <Box mx={"auto"} style={{maxWidth: "800px"}}>
                <h1 style={{color: "#222426"}}>What characterizes a good question on Stack Overflow?</h1>
                <p>For our final project in TDT4173 Machine Learning at NTNU, we have attempted to find an answer to this question.</p>
                <br/>
                <p>We have not found an answer, through by using 45k previously asked questions on stackoverflow.com, we have trained a model that might shed some light on the characteristics of a high quality question, and that of a low quality and unfocused question.</p>
                <br/>
            </Box>
            <Box mx={"auto"}>
                <img src={logo} alt="Logo" style={{height: "45vh"}} />
            </Box>
        </Box>
    )
};

export default Landing;