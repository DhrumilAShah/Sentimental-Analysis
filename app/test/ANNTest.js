var amazon_samples = require('./../resources/amazon_sentences');
var imdb_samples = require('./../resources/imdb_sentences');
var yelp_samples = require('./../resources/yelp_sentences');
var twitter_samples = require('./../resources/twitter_sentences');
var twitter_samples_2 = require('./../resources/twitter_sentences_2');
var twitter_samples_3 = require('./../resources/twitter_sentences_3');
var sample_samples = require('./../resources/sample_sentences');
var hotel_pos_sentences = require('./../resources/hotel_pos_sentences');
var hotel_neg_sentences = require('./../resources/hotel_neg_sentences');
var ann = require('./../algo/ANN');
var tfIdf = require('./../algo/TF-IDF');
var vector = [];
var labels = [];
var vectorise = (sample) => {
  tfIdf.tfIdfLearn(sample);
  return tfIdf.tfIdfCal(sample);
}

[vector, labels] = vectorise(yelp_samples);
ann.train(vector, labels);
vectorise(yelp_samples);
// vectorise(imdb_samples);
// vectorise(twitter_samples_2);
let counter = 0;
let len = vector.length;

for (let i = 0; i < len; i++) {
  let tp = ann.run(vector[i]);
  if (Math.round(tp) == labels[i]) counter++;
}
console.log("--" + counter / len);