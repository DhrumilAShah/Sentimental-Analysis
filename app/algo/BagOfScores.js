var bagOfWords = require('./../resources/AFINN.json');

var analyse = (textArr) => {
  return new Promise((resolve, reject) => {
    if (!textArr instanceof Array) {
      reject("Error In Input String Array");
    }

    let score = 0;
    let words = [];
    let positive = [];
    let negative = [];
    var result = new Object();

    for (var i in textArr) {
      let num = bagOfWords[textArr[i].toLocaleLowerCase()];
      if (num != undefined || num != null) {
        if (num > 0) positive.push(textArr[i]);
        else negative.push(textArr[i]);
        score += num;
        words.push(textArr[i]);
      }
    }

    let comparative = score / textArr.length;

    result.score = score;
    result.comparative = comparative;
    result.words = words;
    result.tokens = textArr;
    result.positive = positive;
    result.negative = negative;

    resolve(result);
  });
}

var isPositive = (textArr) => {
  return new Promise((resolve, reject) => {
    if (!textArr instanceof Array) {
      reject("Error In Input String Array");
    }
    let score = 0;
    for (var i in textArr) {
      let num = bagOfWords[textArr[i].toLocaleLowerCase()];
      if (num != undefined || num != null) {
        score += num;
      }
    }
    let comparative = score / textArr.length;
    resolve((comparative > 0.0000000000) ? 1 : 0);
  });
}



module.exports = {
  analyse: analyse,
  isPositive: isPositive
}