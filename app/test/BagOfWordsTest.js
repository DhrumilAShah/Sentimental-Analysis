var amazon_samples = require('./../resources/amazon_sentences');
var imdb_samples = require('./../resources/imdb_sentences');
var yelp_samples = require('./../resources/yelp_sentences');
var twitter_samples = require('./../resources/twitter_sentences');
var sentiment = require('./../algo/BagOfScores');
var sarcasm = require('./../resources/sarcasm');
const before = Date.now();


var bowTest = (samples, name) => {
    var counter = 0;
    var promises = [];
    var val = [];
    for (let i in samples) {
      promises.push(sentiment.isPositive(((samples[i].snt).toString()).split(" ")));
      val.push(samples[i].val);
    }
    Promise.all(promises).then((res) => {
      val.forEach((value, i) => {
        if (value == res[i]) counter++;
      })
      console.log("Bag Of Scores Approach, " + name + " Accuracy: " + (counter / res.length) * 100 + "%");
      return (counter / res.length) * 100
    }).catch((err) => {
      console.log(err);
    });
  }


  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - bowTest(amazon_samples, "Amazon");
bowTest(imdb_samples, "IMDB");
bowTest(yelp_samples, "Yelp");
// bowTest(twitter_samples, "Twitter");
bowTest(sarcasm, "Sarcasm");

console.log((Date.now() - before) / 1000);