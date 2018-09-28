var tfIdf = require('./TF-IDF');
var vecData = [];
var label = [];
var k = 5;
var vectorise = (sample, near) => {
  tfIdf.tfIdfLearn(sample);
  let [vec, lbl] = tfIdf.tfIdfCal(sample);
  vecData = vecData.concat(vec);
  label = label.concat(lbl);
  k = near;
}

var categorise = (sentenceVec) => {
  //if (k < 2 || vecData.length == 0 || vecData.length != label.length) return NaN;
  sentenceVec = tfIdf.calculate(sentenceVec);
  let disVec = new Array(k).fill(new Array(2).fill(1));
  let disVecLength = disVec.length;
  let senLength = sentenceVec.length;
  let posCounter = negCounter = 0;
  let vecDataLength = vecData.length;
  for (let i = 0; i < vecDataLength; i++) {
    let vecLen = vecData[i].length;
    if (senLength > vecLen) vecData[i] = vecData[i].concat(new Array(senLength - vecLen).fill(0));
    else if (senLength < vecLen) sentenceVec = sentenceVec.concat(new Array(vecLen - senLength).fill(0));
    let eucSum = 0;
    let vecDataLength = vecData[i].length;
    for (let k = 0; k < vecDataLength; k++) {
      eucSum = parseFloat(parseFloat(eucSum.toFixed(10)) + parseFloat(Math.pow(vecData[i][k] - sentenceVec[k], 2).toFixed(10)));
    }
    let sqrt = Math.sqrt(eucSum);
    loop2:
      for (let j = 0; j < disVecLength; j++) {
        if (sqrt < disVec[j][0]) {
          disVec[j] = [sqrt, label[i]];
          break loop2;
        }
      }
  }
  for (let i = 0; i < disVecLength; i++) {
    (disVec[i][1] == 1) ? posCounter++ : negCounter++;
  }
  return (posCounter > negCounter) ? 1 : 0;
}

module.exports = {
  vectorise: vectorise,
  categorise: categorise
}