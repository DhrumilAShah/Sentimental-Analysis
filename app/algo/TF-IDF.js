var math = require('math');
var preProcessor = require('./PreProcessor');
const wordMap = new Map;
var sentenceCounter = 0;

var learn = (sentence) => {
  let sentenceArr = preProcessor.cleaner(sentence);
  sentenceCounter++;
  let len = sentenceArr.length;
  for (let i = 0; i < len; i++) {
    wordMap.set(sentenceArr[i], (wordMap.has(sentenceArr[i])) ? (wordMap.get(sentenceArr[i]) + 1) : 1);
  }
}

var calculate = (sentence) => {
  let vector = [];
  let sentenceArr = preProcessor.cleaner(sentence);
  let len = sentenceArr.length;
  let size = wordMap.size;
  for (let i = 0; i < len; i++) {
    let wordCounter = wordMap.get(sentenceArr[i]) | 0;
    let docWordFreq = 0;
    for (let j = 0; j < len; j++) {
      if (sentenceArr[j] == sentenceArr[i]) docWordFreq++;
    }
    vector.push((docWordFreq / len) * (Math.log(sentenceCounter / wordCounter) | 0).toFixed(20));
  }
  return vector;
}

var tfIdfLearn = (samples) => {
  let len = samples.length;
  for (let i = 0; i < len; i++) {
    learn(samples[i].snt);
  }
}

var tfIdfCal = (samples) => {
  let vecData = [];
  let labels = [];
  for (let i in samples) {
    vecData.push(calculate(samples[i].snt));
    labels.push(samples[i].val);
  }
  return [vecData, labels];
}

module.exports = {
  calculate: calculate,
  learn: learn,
  tfIdfLearn: tfIdfLearn,
  tfIdfCal: tfIdfCal
}