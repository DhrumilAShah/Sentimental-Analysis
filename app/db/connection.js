var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:root@ds125368.mlab.com:25368/mydb?maxPoolSize=50";
const dbName = 'mydb';
const collName = 'wordfrequency';

var testconn = () => {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log(err);
    }
    const testDb = client.db(dbName);
    console.log(testDb);
    //var collection = testDb.collection(collName);
    //client.close();
  });
}

var getConnection = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, client) {
      if (err)
        reject(err);
      const db = client.db(dbName);
      resolve(db);
    });
  });
}

var insert = (dbo, wrd, labl) => {
  // MongoClient.connect(url, function(err, client) {
  //   if (err) throw err;
  //   const dbo = client.db(dbName);
  var myObj = {
    word: wrd,
    label: labl,
    freq: 1
  };
  dbo.collection(collName).findOne({
    word: wrd,
    label: labl
  }, {
    _id: 0,
    word: 0,
    label: 0,
    freq: 1
  }, function(err, result) {
    if (err) throw err;
    if (result == null || result.length == 0) {
      dbo.collection(collName).insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("inserted.." + myObj.word);
      });
    } else {
      fre = result.freq + 1;
      dbo.collection(collName).updateOne({
        word: wrd,
        label: labl
      }, {
        $set: {
          freq: fre
        }
      }, function(err, res) {
        if (err) throw err;
        console.log("updated.." + myObj.word);
      });
    }
  });
  //});
}

var findOne = (wrd, labl) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) reject(err);
      var dbo = db.db(dbName);
      dbo.collection(collName).findOne({
        word: wrd,
        label: labl
      }, function(err, result) {
        if (err) reject(err);
        resolve(result.freq);
      });
    });
  });
}

module.exports = {
  insert: insert,
  findOne: findOne,
  getConnection: getConnection,
  testconn: testconn
}