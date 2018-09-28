var math = require('math');
var svm = require('svm');

// var train = (x, y) => {
//   let weight = new Array(x[0].length).fill(0);
//   let eta = 1;
//   let epochs = 1000;
//   errors = [];
//
//   for (let epoch = 0; epoch < epochs; epoch++) {
//     error = 0;
//     for (let i in x) {
//       if (y[i] * math.dot(x[i], weight) < 1) {
//         weight = weight + eta * ((x[i] * y[i]) + (-2 * (1 / epoch) * weight));
//         error = 1;
//       } else {
//         weight = weight + eta * (-2 * (1 / epoch) * weight);
//       }
//       errors.push(error);
//     }
//   }
//   return weight;
// }

data = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
];
labels = [-1, 1, 1, -1];
svm = new svm.SVM();
svm.train(data, labels, {
  C: 1.0
}); // C is a parameter to SVM
testlabels = svm.predict(testdata);







module.exports = {
  train: train
}