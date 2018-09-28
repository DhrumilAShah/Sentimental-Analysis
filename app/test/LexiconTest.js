var amazon_samples = require('./../resources/amazon_sentences');
var imdb_samples = require('./../resources/imdb_sentences');
var yelp_samples = require('./../resources/yelp_sentences');
var twitter_samples = require('./../resources/twitter_sentences_2');
var sarcasm = require('./../resources/sarcasm');
var lexicon = require('./../algo/Lexicon');

const before = Date.now();

var lexiconTest = (samples, name) => {
  var counter = 0;
  var promises = [];
  var val = [];
  for (let i in samples) {
    promises.push(lexicon.categorise(((samples[i].snt).toString()).split(" ")));
    val.push(samples[i].val);
  }
  Promise.all(promises).then((res) => {
    val.forEach((value, i) => {
      if (value == res[i]) counter++;
    })
    console.log("Lexicon Approach, " + name + " Accuracy: " + (counter / res.length) * 100 + "%");
    return (counter / res.length) * 100
  }).catch((err) => {
    console.log(err);
  });
}

lexiconTest(amazon_samples, "Amazon");
lexiconTest(imdb_samples, "IMDB");
lexiconTest(yelp_samples, "Yelp");
lexiconTest(twitter_samples, "Twitter");
//lexiconTest(sarcasm, "Sarcasm");

console.log((Date.now() - before) / 1000);