import React from "react";
import word_index from "../../assets/word_index.json";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HighQualityIcon from '@material-ui/icons/HighQuality';
import { Button, TextField, Box, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Tokenizer, { tokenizerFromJson } from './tokenizer';

const tokenize = text => {
  /*let tokens = text
    .toLowerCase()
    .replace(/[^(a-zA-Z0-9)\s*+\-/=&|]/, "")
    .replace(/[!"#$%&()*+,\-./:;=?@[\\\]^_`{|}~\t\n\r]/g, " ")
    .replace(/\s{2,}/g, " ")
    .split(" ")
    .slice(0, 75);

  let size = tokens.length;
  for (let i = 0; i < size; i++) {
    const token = word_index[tokens[i]];
    tokens[i] = token ? token : null;
  }
  tokens = tokens.filter(p => p != null);
  size = tokens.length;
  if (size < 75) {
    for (let i = 0; i < 75 - size; i++) {
      tokens.unshift(0);
    }
  }    
  return tokens*/
  const tokenizer = new Tokenizer();
  let sequence = tokenizer.textsToSequences(text);
  const padding = 150-sequence[0].length;
  sequence = padding > 0 ? [(new Array(padding).fill(0)).concat(sequence[0])] : sequence; 
  return [sequence[0].slice(-150,sequence[0].length)];
;
};

const Recurrent = () => {
  const [question, setQuestion] = React.useState("");
  const [pred, setPred] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [validate, setValidate] = React.useState(false);

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
    <>
      <Box display="flex" flexDirection="column" mx={4} height={"90vh"}>
        <Box><h1>Recurrent Neural Network with LSTM</h1></Box>
        <Box mx={"auto"} mt={"auto"} width={"90%"} maxWidth={"800px"}> 
        {
            (pred || isLoading ) ? <>
              { 
                isLoading ? <LinearProgress color="secondary" /> 
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
            </> : <Alert severity="info">What would you like to ask the StackOverflow community about today?</Alert>
        }
        </Box>
        <Box flexDirection="column" mt={5} mb={"auto"} mx={"auto"} width={"90%"} maxWidth={"800px"}>
          <TextField 
            id="filled-basic" 
            label="Stackoverflow question" 
            variant="outlined" 
            error={validate && (!question || question.length <= 0)}
            helperText={validate && (!question || question.length <= 0) && "Question cannot be empty"}
            multiline={true}
            fullWidth={true}
            rows={15} 
            onChange={(e) => { setQuestion(e.target.value);  setValidate(true); }} 
          />
          <Box mt={4}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon/>}
              color="secondary"
              onClick={(e) => requestPred()}
              disabled={!question || question.length <= 0}
            >
              Predict
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Recurrent;
