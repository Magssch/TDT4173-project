import React from 'react';
import logo from './stackoverflow.png';
import { Box } from '@material-ui/core';

const Landing = () =>{
    return (
        <Box my={5} display={"flex"} flexDirection={"column"}>
            <Box mx={"auto"} style={{maxWidth: "850px"}}>
                <h1 style={{color: "#222426"}}>What characterizes a good question on Stack Overflow?</h1>
                <p>For our final project in TDT4173 Machine Learning at NTNU, we have attempted to find an answer to this question. We have not found an answer, although, by using 45k previously asked questions on stackoverflow.com, we have trained a model that might shed some light on the characteristics of a high quality question, and that of a low quality and unfocused question.</p>
                <p>In the header you can find links to a general demonstration of k-Nearest Neighbors, as well as a live demonstration of question quality prediction using a Recurrent Neural Network with Long Short-Term Memory.
                The demonstration of predicting question quality is created by hosting the trained model on Google Cloud AI Platform, and sending requests to the model through Firebase Functions.
                    The k-Nearest Neighbors-demonstration is created using d3 to manipulate an svg-illustration. <br/><strong> The k-Nearest Neighbors demonstration is best viewed on desktop.</strong></p>
            </Box>
            <Box mx={"auto"}>
                <img src={logo} alt="Logo" style={{height: "40vh"}} />
            </Box>
        </Box>
    )
};

export default Landing;