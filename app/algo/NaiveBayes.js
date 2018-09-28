var preProcessor = require('./PreProcessor');
const posMap = new Map;
const negMap = new Map;

var learn = (sentence, type) => {
  sentenceArr = preProcessor.cleaner(sentence);
  map = (type == 1) ? posMap : negMap;
  let len = sentenceArr.length;
  for (let i = 0; i < len; i++) {
    map.set(sentenceArr[i], (map.has(sentenceArr[i])) ? (map.get(sentenceArr[i]) + 1) : 1);
  }
}

var printMap = (map) => {
  for (const [key, value] of map.entries()) {
    console.log(key, value);
  }
}

// var probOfClass = (type) => {
// return (type == 1) ? posTrainingCounter / totalTrainingCounter : negTrainingCounter / totalTrainingCounter;
// }

var condWordLiklihdProb = (word, type) => { //  w,c +1 / c + total c
  var totalWords = posMap.size + negMap.size;
  return (type == 1) ? parseFloat((posMap.get(word) | 0 + 1) / (posMap.size + totalWords)) :
    parseFloat((negMap.get(word) | 0 + 1) / (negMap.size + totalWords));
}

var categorise = (sentence) => {
  sntArr = preProcessor.cleaner(sentence);
  let posProb = 1.0;
  let negProb = 1.0;
  let len = sntArr.length;
  for (let i = 0; i < len; i++) {
    posProb = posProb * condWordLiklihdProb(sntArr[i], 1);
    negProb = negProb * condWordLiklihdProb(sntArr[i], 0);
  }
  return (posProb > negProb) ? 1 : 0;
}

// learn("Good case Excellent value", 1);
// learn("Great for the jawbone", 1);
// learn("The mic is great", 1);
// learn("So there is no way for me to plug it in here in the US unless I go by a converter", 0);
// learn("Tied to charger for conversations lasting more than 45 minutes.MAJOR PROBLEMS!!", 0);
// learn("I have to jiggle the plug to get it to line up right to get decent volume", 0);
// learn("Tied to charger for conversations lasting more than 45 minutes.MAJOR PROBLEMS!!", 0);
// learn("I have to jiggle the plug to get it to line up right to get decent volume", 0);
// sentence = "asdthem thisssthis them themmm man for good this his no running cats dogs capable intution returns runs running does capability";
// sentence = sentence.split(" ").map((val) => {
//   return (stopWords.indexOf(val) != -1) ? null : stemmer(val);
// }).filter((val) => {
//   return (val == null) ? false : true;
// });
// console.log(sentence);
//console.log("@asdthem thisssthis them them@mm @man for good this his".replace(/@\S+/g, ''));
//console.log(0.047619047619047616 * 1);

module.exports = {
  categorise: categorise,
  learn: learn
}