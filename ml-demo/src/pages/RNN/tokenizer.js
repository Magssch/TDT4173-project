
import word_index from "../../assets/word_index.json";
// Inspired by https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

class Tokenizer {
    constructor(config = {}) {
      this.filters = config.filters || /[\\.,/#!$%^&*;:{}=\-_`~()]/g;
      this.lower = typeof config.lower === 'undefined' ? true : config.lower;
  
      // Primary indexing methods. Word to index and index to word.
      this.wordIndex = word_index;
      this.indexWord = {};
  
      // Keeping track of word counts
      this.wordCounts = {};
    }
  
    cleanText(text) {
      if (this.lower) text = text.toLowerCase();
      return text
        .replace(/[^(a-zA-Z0-9)\s*+\-/=&|]/, "")
        .replace(/[!"#$%&()*+,\-./:;=?@[\\\]^_`{|}~\t\n\r]/g, " ")
        .replace(/\s{2,}/g, " ")
        .split(" ")
    }
  
    fitOnTexts(texts) {
      texts.forEach(text => {
        text = this.cleanText(text);
        text.forEach(word => {
          this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
        });
      });
  
      Object.entries(this.wordCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, number], i) => {
          this.wordIndex[word] = i + 1;
          this.indexWord[i + 1] = word;
        });
    }
  
    textsToSequences(texts) {
      return texts.map(text => this.cleanText(text).filter(word => !!this.wordIndex[word]).map(word => this.wordIndex[word]));
    }
  
    toJson() {
      return JSON.stringify({
        wordIndex: this.wordIndex,
        indexWord: this.indexWord,
        wordCounts: this.wordCounts
      })
    }
  }
  
  export const tokenizerFromJson = json_string => {
    const tokenizer = new Tokenizer();
    const js = JSON.parse(json_string);
    tokenizer.wordIndex = js.wordIndex;
    tokenizer.indexWord = js.indexWord;
    tokenizer.wordCounts = js.wordCounts;
    return tokenizer;
  };
  
  export default Tokenizer;