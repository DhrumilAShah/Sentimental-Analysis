var tp = require('./connection');
var preProcessor = require('./../algo/PreProcessor');
var hotel_neg_sentences = require('./../resources/hotel_neg_sentences');
//console.log(hotel_pos_sentences.length); //4,80,108
//console.log(hotel_neg_sentences.length); //3,88,154

//bufferMaxEntries
var sample_samples = require('./../resources/hotel_neg_sentences');

var insert = (conn, samples, name) => {
  for (let i = 30000; i < 32500; i++) {
    sentenceArr = preProcessor.cleaner(samples[i].snt);
    sentenceArr.forEach((val) => {
      tp.insert(conn, val, samples[i].val);
    });
  }
}

var insert1 = (conn, samples, name) => {
  for (let i = 32500; i < 35000; i++) {
    sentenceArr = preProcessor.cleaner(samples[i].snt);
    sentenceArr.forEach((val) => {
      tp.insert(conn, val, samples[i].val);
    });
  }
}

var insert2 = (conn, samples, name) => {
  for (let i = 35000; i < 37500; i++) {
    sentenceArr = preProcessor.cleaner(samples[i].snt);
    sentenceArr.forEach((val) => {
      tp.insert(conn, val, samples[i].val);
    });
  }
}
var insert3 = (conn, samples, name) => {
  for (let i = 37500; i < 40000; i++) {
    sentenceArr = preProcessor.cleaner(samples[i].snt);
    sentenceArr.forEach((val) => {
      tp.insert(conn, val, samples[i].val);
    });
  }
}

tp.getConnection().then((res) => {
  console.log(res);
  insert(res, sample_samples, "");
}).catch((err) => {
  console.log(err);
});
tp.getConnection().then((res) => {
  console.log(res);
  insert1(res, sample_samples, "");
}).catch((err) => {
  console.log(err);
});
tp.getConnection().then((res) => {
  console.log(res);
  insert2(res, sample_samples, "");
}).catch((err) => {
  console.log(err);
});
tp.getConnection().then((res) => {
  console.log(res);
  insert3(res, sample_samples, "");
}).catch((err) => {
  console.log(err);
});