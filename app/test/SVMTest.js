var tdIdf = require('./../algo/TF-IDF');
var svm = require('svm');
var ml = require('machine_learning');
var twitter_samples_2 = require('./../resources/twitter_sentences_2');
var tp = require('./../resources/tp');
var vecData = [];
var labels = [];

var tfidfLearn = (samples, name) => {
  for (let i in samples) {
    tdIdf.learn(samples[i].snt, samples[i].val);
  }
}

var tfidfCal = (samples, name) => {
  for (let i in samples) {
    vecData.push(tdIdf.calculate(samples[i].snt, samples[i].val));
    labels.push(samples[i].val);
  }
}

tfidfLearn(twitter_samples_2, "Twitte2");
tfidfCal(twitter_samples_2, "Twitte2");

let size = 7;
var filter = (sentVec) => {
  let len = sentVec.length;
  if (len < size) {
    sentVec = sentVec.concat(new Array(size - len).fill(0));
  } else if (len > size) {
    while (sentVec.length != size) {
      let index = sentVec.indexOf(Math.min(sentVec));
      sentVec.splice(index, 1);
    }
  }
  return sentVec;
}


//svmObj = new svm.SVM();
labels = labels.map((val) => {
  return (val == 0) ? -1 : val;
});


let filterData = [];
vecData.forEach((val) => {
  filterData.push(filter(val));
});

// console.log(filterData);
// svmObj.train(filterData, labels);
// console.log(filter(tdIdf.calculate("Louis inspired outfit on Monday and Zayn inspired outfit today..4/5 done just need Harry  :)")));
// testlabels = svmObj.predict(filter(tdIdf.calculate("Louis inspired outfit on Monday and Zayn inspired outfit today..4/5 done just need Harry  :)")));
// console.log(testlabels);
console.log(filterData);
var svm = new ml.SVM({
  x: filterData,
  y: labels
});

svm.train({
  C: 1.1, // default : 1.0. C in SVM.
  tol: 1e-5, // default : 1e-4. Higher tolerance --> Higher precision
  max_passes: 20, // default : 20. Higher max_passes --> Higher precision
  alpha_tol: 1e-5, // default : 1e-5. Higher alpha_tolerance --> Higher precision
  kernel: {
    type: "polynomial",
    c: 1,
    d: 5
  }
});
let sent = "he is very bad, hate him ,very sad, it is worst";
console.log("Predict : ", svm.predict(filter(tdIdf.calculate(sent))));