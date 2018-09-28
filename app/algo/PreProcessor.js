const stopWords = require('./StopWordsFiltering').stopWords;
var stemmer = require('stemmer');


var cleaner = (sentence) => {
  return sentence = String(sentence).toLowerCase().replace(/@\S+/g, '').replace(/[\W_0-9]+/g, ' ')
    .trim().replace(/(\b(\w{1,2})\b(\s|$))/g, '').replace('  ', ' ').trim()
    .split(" ").map((val) => {
      return (stopWords.indexOf(val) != -1) ? null : stemmer(val);
    }).filter((val) => {
      return (val == null) ? false : true;
    });
}


module.exports = {
  cleaner: cleaner
}