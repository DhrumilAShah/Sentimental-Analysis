var algorithmia = require("algorithmia");
// var input = {
//   "getVecFromWord": ["intelligence"]
// };
var getVec = (word) => {

  algorithmia.client("simx/iwURahW3Dr3cdQX4dtHcKA1")
    .algo("nlp/Word2Vec/1.1.1")
    .pipe({
      "getVecFromWord": [String(word).toLowerCase().trim()]
    })
    .then(function(output) {
      return JSON.stringify(output.result.vecFromWord[0]);
    });
}

module.exports = {
  getVec: getVec
}