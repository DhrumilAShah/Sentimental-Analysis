var stop_words = new Array('about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also',
  'although', 'always', 'among', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'around',
  'ask', 'asked', 'asking', 'asks', 'away', 'back', 'backed', 'backing', 'backs', 'became', 'because', 'become', 'becomes',
  'been', 'before', 'began', 'behind', 'being', 'beings', 'between', 'both', 'but', 'came', 'can',
  'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'did', 'differ', 'different', 'differently', 'does',
  'done', 'down', 'down', 'downed', 'downing', 'downs', 'during', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends', 'enough',
  'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'face', 'faces', 'fact', 'facts', 'far', 'felt',
  'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'gave',
  'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'going', 'goods', 'got',
  'group', 'grouped', 'grouping', 'groups', 'had', 'has', 'have', 'having', 'her', 'here', 'herself', 'high',
  'higher', 'highest', 'him', 'himself', 'his', 'how', 'however', 'important', 'interest', 'interested', 'interesting',
  'interests', 'into', 'its', 'itself', 'just', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'large',
  'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'made', 'make',
  'making', 'man', 'many', 'may', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mrs', 'much', 'must',
  'myself', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'newer', 'newest', 'next', 'nobody',
  'noone', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'often', 'old', 'older', 'oldest', 'once', 'one',
  'only', 'open', 'opened', 'opening', 'opens', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our', 'out', 'over',
  'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points',
  'present', 'presented', 'presenting', 'presents', 'put', 'puts', 'quite', 'rather', 'really',
  'room', 'rooms', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems',
  'sees', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller',
  'smallest', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'such', 'sure',
  'take', 'taken', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think',
  'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'today', 'together', 'too', 'took',
  'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'under', 'until', 'upon', 'use', 'used', 'uses',
  'want', 'wanted', 'wanting', 'wants', 'was', 'way', 'ways', 'well', 'wells', 'went', 'were', 'what', 'when', 'where',
  'whether', 'which', 'while', 'who', 'whole', 'whose', 'why', 'will', 'with', 'within', 'work', 'worked', 'working',
  'works', 'would', 'year', 'years', 'yet', 'you', 'young', 'younger', 'youngest', 'your', 'yours', 'january', 'febuary',
  'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'monday', 'tuesday',
  'wednesday', 'thursday', 'friday', 'saturday', 'mom', 'dad', 'boy', 'woman', 'male', 'female', "a's", "able", "according",
  "accordingly", "actually", "afterwards", "ain't", "allow", "allows", "amongst", "anyhow", "anyway", "anyways", "apart", "appear",
  "appreciate", "appropriate", "aren't", "aside", "associated", "available", "awfully", "becoming", "beforehand", "believe", "below",
  "beside", "besides", "best", "better", "beyond", "brief", "c'mon", "c's", "can't", "cannot", "cant", "cause", "causes", "changes",
  "com", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding",
  "couldn't", "course", "currently", "definitely", "described", "despite", "didn't", "doesn't", "doing", "don't", "downwards",
  "edu", "eight", "else", "elsewhere", "entirely", "especially", "etc", "exactly", "example", "except", "fifth", "five", "followed",
  "following", "follows", "former", "formerly", "forth", "furthermore", "getting", "goes", "gone", "gotten", "greetings", "hadn't",
  "happens", "hardly", "hasn't", "haven't", "he's", "hello", "help", "hence", "here's", "hereafter", "hereby", "herein", "hereupon",
  "hers", "hither", "hopefully", "howbeit", "i'd", "i'll", "i'm", "i've", "ignored", "immediate", "inasmuch", "inc", "indeed",
  "indicate", "indicated", "indicates", "inner", "insofar", "instead", "inward", "isn't", "it'd", "it'll", "it's", "kept", "lately",
  "latter", "latterly", "lest", "let's", "liked", "little", "look", "looking", "ltd", "mainly", "maybe", "mean", "meanwhile",
  "merely", "moreover", "name", "namely", "near", "nearly", "neither", "nevertheless", "nine", "non", "nor", "normally",
  "novel", "obviously", "okay", "ones", "onto", "otherwise", "ought", "ours", "ourselves", "outside", "overall", "own", "particular",
  "particularly", "placed", "please", "plus", "possible", "presumably", "probably", "provides", "que", "reasonably", "regarding", "regardless",
  "regards", "relatively", "respectively", "saying", "secondly", "seeing", "seen", "self", "selves", "sensible", "sent", "serious", "seriously",
  "seven", "shouldn't", "six", "somehow", "sometime", "sometimes", "somewhat", "soon", "specified", "specify", "specifying", "sub", "sup", "t's",
  "tell", "tends", "that's", "thats", "theirs", "themselves", "thence", "there's", "thereafter", "thereby", "therein", "theres",
  "thereupon", "they'd", "they'll", "they're", "they've", "third", "thorough", "thoroughly", "throughout", "thru", "towards", "tried", "tries",
  "try", "trying", "twice", "unless", "unlikely", "unto", "using", "usually", "various", "via",
  "viz", "wasn't", "we'd", "we'll", "we're", "we've", "welcome", "weren't", "what's", "whatever", "whence", "whenever", "where's",
  "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whither", "who's", "whoever", "whom", "willing", "wish",
  "without", "won't", "wonder", "wouldn't", "yes", "you'd", "you'll", "you're", "you've", "yourself", "yourselves", "zero",
  "abst", " accordance", " act", " added", " adj", " affected", " affecting", " affects", " announce", " anymore", " apparently", " approximately",
  "aren", " arent", " arise", " auth", " begin", " beginning", " beginnings", " begins", " biol", " briefly", " couldnt", " date", " due", " effect",
  " eighty", " et-al", " fix", " found", " giving", " hed", " heres", " hes", " hid", " home", " hundred", " immediately", " importance", " index",
  "information", " invention", " itd", " keep keeps", " line", " 'll", " looks", " makes", "means", "meantime", " million", " miss", " mug", "nay",
  "inecessarily", " ninety", " none", " nonetheless", " nos", " not", " noted", " obtain", " obtained", " off", " omitted", " ord", " owing", " page",
  " pages", " past", " poorly", " possibly", " potentially", " predominantly", " previously", " primarily", " promptly", " proud", " quickly", " ran",
  " readily", " recent", " recently", " ref", " refs", " related", " research", " resulted", " resulting", "results", " right", " run", " sec",
  " section", " shed", "she'll", " shes", " shown", "showns ", "significant ", "significantly ", "similar ", "similarly ", "slightly ", "somethan ",
  "specifically", "stop", "strongly", "substantially", "sufficiently", "suggest", "taking",
  "that'll", "that've", "thered", "there'll", "thereof", "therere", "thereto", "there've", "theyd", "theyre", "thou", "thoughh",
  "thousand", " throug", " til", " tip", " truly", " unfortunately", "unlike", "ups", "useful", "usefully", "usefulness", "value", "'ve",
  "very", "vol ", "vols ", "wasnt ", "wed ", "werent ", "what'll", " whats", "wheres", "whim", "whod", "who'll ", "whomever ", "whos ", "widely ",
  "wont", "words", "world", "wouldnt ", "www", "youd", "youre");



module.exports = {
  stopWords: stop_words
}

// var t = [];
//
// t = t.filter((val) => {
//   if (val.length > 2) return true;
//   return false;
// });
// t = t.filter((val, pos) => {
//   for (let i = 0; i < stop_words.length; i++) {
//     if (val == stop_words[i]) {
//       return false;
//     }
//   }
//   return true;
// });
//
// console.log(t);
//
// var fs = require('fs');
// var file = fs.createWriteStream('array.txt');
// file.on('error', function(err) { /* error handling */ });
// t.forEach(function(v) {
//   file.write(v + ',' + '\n');
// });
// file.end();