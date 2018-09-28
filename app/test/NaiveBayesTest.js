var amazon_samples = require('./../resources/amazon_sentences');
var imdb_samples = require('./../resources/imdb_sentences');
var yelp_samples = require('./../resources/yelp_sentences');
var twitter_samples = require('./../resources/twitter_sentences');
var twitter_samples_2 = require('./../resources/twitter_sentences_2');
var twitter_samples_3 = require('./../resources/twitter_sentences_3');
var sample_samples = require('./../resources/sample_sentences');
var hotel_pos_sentences = require('./../resources/hotel_pos_sentences');
var hotel_neg_sentences = require('./../resources/hotel_neg_sentences');
var sarcasm = require('./../resources/sarcasm');
var naiveBayes = require('./../algo/NaiveBayes');
//var bow = require('./../algo/BagOfWords');

const before = Date.now();

var naiveBayesLearn = (samples, name) => {
  for (let i in samples) {
    naiveBayes.learn(samples[i].snt, samples[i].val);
  }
}

var naiveBayesTest = (samples, name) => {
  let counter = 0;
  for (let i in samples) {
    if (naiveBayes.categorise(samples[i].snt) == samples[i].val)
      counter++;
  }
  console.log(counter / samples.length);
}

naiveBayesLearn(hotel_pos_sentences, "hotel_pos_sentences");
naiveBayesLearn(hotel_neg_sentences, "hotel_neg_sentences");
naiveBayesLearn(sample_samples, "Random");
naiveBayesLearn(twitter_samples_2, "Twitte2");
naiveBayesLearn(twitter_samples_3, "Twitte3");
//naiveBayesLearn(bow, "BagOfWords");

naiveBayesLearn(twitter_samples, "Twitter");
//naiveBayesLearn(imdb_samples, "IMDB");
//naiveBayesLearn(yelp_samples, "Yelp");
//naiveBayesLearn(amazon_samples, "Amazon"); //naiveBayesTest
//naiveBayesTest(sarcasm, "Sarcasm");

console.log((Date.now() - before) / 1000);