import React from "react";
import word_index from "../../assets/word_index.json";
import { AccountBoxTwoTone, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HighQualityIcon from '@material-ui/icons/HighQuality';
import { Button, TextField, Box, LinearProgress, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { Alert } from '@material-ui/lab';
import { palette } from '@material-ui/system';
import Tokenizer, { tokenizerFromJson } from './tokenizer';

const sampleQuestions = [
  {
    quality: "High quality",
    rating: 7944,
    title: "How do I check if an element is hidden in jQuery?",
    body: "Is it possible to toggle the visibility of an element, using the functions .hide(), .show() or .toggle()? How would you test if an element is visible or hidden?",
    url: "https://stackoverflow.com/questions/178325/how-do-i-check-if-an-element-is-hidden-in-jquery",
  },
  {
    quality: "Low quality and closed",
    rating: -2,
    title: "Planning to make web app like Canva",
    body: "I want to make app like canva but i dont know where to start, i have good experience in html and css but a basic javascript. I need to know what they use. How to save html data to image like canva functions. How they save the data and load it again. I already try Html2canvas but problem in images limit.",
    url: "https://stackoverflow.com/questions/34583878/planning-to-make-web-app-like-canva/35942896",
  },
  {
    quality: "Low quality and editted",
    rating: -4,
    title: "i have json file on local computer i want to use that file in javascript how can i use that in js",
    body: "Following is the code snippet which i am trying var json = require('dictonery.json'); //(with path) console.log(json);",
    url: "https://stackoverflow.com/questions/34583878/planning-to-make-web-app-like-canva/35942896",
  },
]
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F48024',
    },
    secondary: {
      main: '#222426',
    },
  }
});

const tokenize = text => {
  const tokenizer = new Tokenizer();
  let sequence = tokenizer.textsToSequences(text);
  const padding = 150-sequence[0].length;
  sequence = padding > 0 ? [(new Array(padding).fill(0)).concat(sequence[0])] : sequence; 
  return [sequence[0].slice(-150,sequence[0].length)];
};

const Recurrent = () => {
  const classes = useStyles();
  const [question, setQuestion] = React.useState("");
  const [pred, setPred] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [validate, setValidate] = React.useState(false);

  const handleLinkClick = (url) => {
    window.location.href=url;
  }

  const autoFill = (body) => {
    setQuestion(body);
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  const requestPred = () => {
    setIsLoading(true);
    fetch('https://us-central1-tdt4173-project-sl-1.cloudfunctions.net/getQuestionQuality',{
      method: 'POST',
      mode: 'cors', 
      'Content-Type': 'application/json',
      body: JSON.stringify({
        "instances": tokenize([question])
      })
    })
      .then(response=>response.json())
      .then(response => {
        console.log(response);
        setPred(response.predictions[0])
      })
      .catch(err => console.log(err))
      .finally(()=> setIsLoading(false));
  }

  return (
    <ThemeProvider theme={theme}>
    <Box style={{background: "linear-gradient(110deg, #FFFFFF 50%, rgba(0, 0, 0, 0) 40%), linear-gradient(110deg, #F48024 70%, #BCBBBB 5%)"}}>
      <Box display="flex" flexDirection="row" flexWrap={"wrap"} mx={2} py={2}>
        <Box display="flex" flexDirection="column" mx={"auto"} maxWidth={"600px"} minWidth={"300px"}>
          <Box>
            <h1 id={"top"} style={{color: "#222426"}}>Recurrent Neural Network with LSTM</h1>
            <Box maxWidth={"80%"} m={"auto"}>
              <Typography 
                className={classes.title} 
                color="textSecondary" 
              >
                Predicting Stack Overflow question quality with the Keras API for Tensorflow. 
                Test the accuracy of the model yourself by copying the text content of a real 
                Stack Overflow question and click "Predict" to query the model on Google Cloud 
                AI Platform and receive a quality prediction.
              </Typography>
            </Box>
          </Box>
          <Box mt={4}> 
          {
              (pred || isLoading ) ? <>
                { 
                  isLoading ? <Box><LinearProgress color="primary"/></Box>
                  : <>
                    {
                      pred && pred[0] > pred[1] && pred[0] > pred[2] && <Alert severity="error">This is likely a bad question: Our model is {Math.floor(pred[0]*100)}% confident that this question will receive a negative score and be closed.</Alert>
                    }
                    {
                      pred && pred[1] > pred[0] && pred[1] > pred[2] && <Alert severity="warning">This question could be improved: Our model is {Math.floor(pred[1]*100)}% confident that this question will receive a negative score. Try to be more precise.</Alert>
                    }
                    {
                      pred && pred[2] > pred[0] && pred[2] > pred[1] && <Alert severity="success" iconMapping={{ success: <HighQualityIcon fontSize="inherit" /> }}>Great job! Our model is {Math.floor(pred[2]*100)}% confident that this is a high quality question that will get a high score.</Alert>
                    }
                  </>
                }
              </> : <Alert severity="info">What would you like to ask the Stack Overflow community about today?</Alert>
          }
          </Box>
          <Box flexDirection="column" mt={5} mb={"auto"} mx={"auto"} width={"100%"}>
            <Card>
              <Box p={2}>
                <TextField 
                  id="filled-basic" 
                  label="Stackoverflow question" 
                  variant="filled" 
                  value={question}
                  error={validate && (!question || question.length <= 0)}
                  helperText={validate && (!question || question.length <= 0) && "Question cannot be empty"}
                  multiline={true}
                  fullWidth={true}
                  rows={15}
                  color={"secondary"}
                  onChange={(e) => { setQuestion(e.target.value);  setValidate(true); }} 
                />
              </Box>
            </Card>
            <Box mt={4}>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon style={{color: "white"}}/>}
                color={"primary"}
                style={{color: "white"}}
                onClick={(e) => requestPred()}
                disabled={!question || question.length <= 0}
              >
                Predict
              </Button>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" maxWidth={"500px"} minWidth={"300px"}  mx={"auto"}>
          <Box><h2 style={{color: "#222426"}}>Or select and auto-fill a sample question from stackoverflow.com:</h2></Box>
          {sampleQuestions.map((sampleQuestion, key) => (
            <Card key={key} style={{marginTop: "1rem"}}>
              <Box display="flex" flexDirection="row" m={2} style={{cursor: "pointer"}} onClick={() => autoFill(sampleQuestion.body)}>
                <Box display="flex" flexDirection="column" alignItems={"center"} pt={2}>
                  <KeyboardArrowUp/>
                  <Typography variant="h5" component="h2">
                    {sampleQuestion.rating}
                  </Typography>
                  <KeyboardArrowDown/>
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {sampleQuestion.title}
                  </Typography>
                  <Typography variant="body2" component="p" pt={3}>
                    {sampleQuestion.body}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions>
                <Button size="small" onClick={(e) => {e.preventDefault(); handleLinkClick(sampleQuestion.url)}}>See question on stackoverflow.com</Button>
                <Box flexGrow={1}></Box>
                <Box mr={1}>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {sampleQuestion.quality}
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    scrollBehavior: "smooth"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default Recurrent;
