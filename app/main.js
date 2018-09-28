const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//var beautify = require("json-beautify");
var sentiment = require('./sentiment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/:text', (req, res) => {
  sentiment.analyse(req.params.text.split(" ")).then((result) => {
    res.render('index', {
      result: JSON.stringify(result)
    });
  }).catch((err) => {
    res.sendStatus(500);
  });
});

app.listen(app.get('port'), () => {
  console.log('Server Started At Port: ' + app.get('port'));
});