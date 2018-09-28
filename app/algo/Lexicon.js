var posWords = require('./../resources/positive-words.json');
var negWords = require('./../resources/negative-words.json');

var categorise = (textArr) => {
  return new Promise((resolve, reject) => {
    if (!textArr instanceof Array) {
      reject("Error In Input String Array");
    }
    let poscounter = 0;
    let negcounter = 0;
    for (let j in textArr) {
      if (posWords.includes(textArr[j])) poscounter++;
      if (negWords.includes(textArr[j])) negcounter++;
    }
    resolve((poscounter > negcounter) ? 1 : 0);
  });
}

module.exports = {
  categorise: categorise
}