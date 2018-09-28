var amazon_samples = require('./../resources/amazon_sentences');
var imdb_samples = require('./../resources/imdb_sentences');
var yelp_samples = require('./../resources/yelp_sentences');
var twitter_samples = require('./../resources/twitter_sentences');
var twitter_samples_2 = require('./../resources/twitter_sentences_2');
var twitter_samples_3 = require('./../resources/twitter_sentences_3');
var sample_sentences = require('./../resources/sample_sentences');
var hotel_pos_sentences = require('./../resources/hotel_pos_sentences');
var hotel_neg_sentences = require('./../resources/hotel_neg_sentences');
var bow = require('./../algo/BagOfWords');
var knn = require('./../algo/KNN');

const before = Date.now();

var knnCategorise = (sample, k) => {
  let counter = 0;
  sample.forEach((val, pos) => {
    //console.log(val.snt, val.val);
    if (knn.categorise(val.snt) == val.val) {
      counter++;
      console.log(counter, "--> " + pos)
    }
  });
  var c = counter / sample.length;
  console.log(c);
}

//knn.vectorise(twitter_samples_2, 3);
//knn.vectorise(bow, 1);
knn.vectorise(twitter_samples_2, 3);
knn.vectorise(amazon_samples, 3);
knn.vectorise(imdb_samples, 3);

knnCategorise(yelp_samples);

console.log(Date.now() - before);