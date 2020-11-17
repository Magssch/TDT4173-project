import React from "react";
import word_index from "../../assets/word_index.json";

const question =
  "pid like to understand why java 8 optionals were designed to be immutable.  is it just for thread-safety/p";

const tokenizer = text => {
  let tokens = text
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
  return tokens;
};

const Recurrent = () => {
  const [tokens, setTokens] = React.useState([]);

  React.useEffect(() => {
    setTokens(tokenizer(question));
  }, [setTokens]);

  return (
    <div>
      {console.log(tokens)}
      Recurrent Neural Network with LSTM
    </div>
  );
};

export default Recurrent;
