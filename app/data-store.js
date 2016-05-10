/**
 * Created by ych on 5/10/16.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

exports = module.exports = createDataStore();


function createDataStore() {
    return {
        insertOne: insertOne,
        query: query
    };
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});

var insertRecords = function(db, obj, callback) {
    db.collection('study_records').insertOne(obj, function (err, result) {
        assert.equal(err, null);
        console.log('one records inserted into study_records');
        callback();
    });
};

var findRecords = function (db, filter, callback) {
    var cursor;
    if (filter) {
        cursor = db.collection('study_records').find(filter);
    } else {
        cursor = db.collection('study_records').find();
    }
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc) {
            console.dir(doc);
        } else {
            callback();
        }
    })
};

function updateHours(db, filter, callback) {
    if (filter) {
        db.collection('study_records').updateMany(filter, {
            $set: {'hours': 60}
        }, function (err, results) {
            // console.log(results);
            assert.equal(err, null);
            callback();
        })
    }
}

function deleteAll(db, filter, callback) {
    if (filter) {
        db.collection('study_records').deleteMany(filter, function (err, results) {
            assert.equal(null, err);
            callback();
        });
    } else {
        db.collection('study_records').deleteMany({}, function (err, results) {
            callback();
        })
    }
}

function insertOne(records) {
    MongoClient.connect(url, function (err, db) {
        console.dir(records);
        insertRecords(db, records, function () {
            db.close();
        });
    });
}

MongoClient.connect(url, function (err, db) {
    updateHours(db, {hours: {$gt: 90}}, function () {
        db.close();
    })
});

MongoClient.connect(url, function (err, db) {
    deleteAll(db, {}, function () {
        db.close();
    })
})


function query() {
    MongoClient.connect(url, function (err, db) {
        assert.equal(err, null);

        // findRecords(db, {$or: [{hours: {$gt: 90}}, {hours: {$lt: 80}}]}, function () {
        findRecords(db, {}, function () {
            db.close();
        });
    });
}
