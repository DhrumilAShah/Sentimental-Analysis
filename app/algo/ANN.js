const synaptic = require('synaptic');
const {
  Layer,
  Network
} = synaptic;

var preProcessor = require('./PreProcessor');
var tdIdf = require('./TF-IDF');

var inputLayer = new Layer(14);
var hiddenLayer = new Layer(10);
var outputLayer = new Layer(1);

var learningRate = 0.3;

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

var train = (sentenceVec, type) => {
  let len = sentenceVec.length;
  for (let i = 0; i < 20000; i++) {
    for (let j = 0; j < len; j++) {
      myNetwork.activate(filter(sentenceVec[j]));
      myNetwork.propagate(learningRate, [type[j]]);
    }
  }
}

var run = (sentenceVector) => {
  sentenceVector = filter(sentenceVector);
  return myNetwork.activate(sentenceVector);
}

var filter = (sentVec) => {
  let len = sentVec.length;
  if (len < 14) {
    sentVec = sentVec.concat(new Array(14 - len).fill(0));
  } else if (len > 14) {
    while (sentVec.length != 14) {
      let index = sentVec.indexOf(Math.min(sentVec));
      sentVec.splice(index, 1);
    }
  }
  return sentVec;
}


module.exports = {
  train: train,
  run: run
}