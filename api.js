var express = require('express');
var dataStore = require('./app/data-store.js');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('app'));

console.dir(dataStore);
dataStore.query();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log("Time: " + Date.now());
    next();
    
});

app.put('/records.json', function (req, res) {
    console.dir(req.body);
    dataStore.insertOne(req.body);
});

app.get('/records', function (req, res) {
    res.type('json');
    res.json({
        theme: ['web', 'java', 'javascript', 'front end', 'angularJS'],
        goal: 'expert level in angularJS for test',
        planHours: "80",
        usedHours: "30",
        progresses: [
            {
                item: 'basic/tutorial', expect: 10, now: 10, details: [
                {date: "2016-04-15", hours: 5, note: "what i have learnt: "},
                {date: "2016-04-16", hours: 3, note: "what i have learnt: "},
                {date: "2016-04-17", hours: 3, note: "what i have learnt: "},
            ]
            },
            {
                item: 'concept', expect: 10, now: 7, details: [
                {date: "2016-04-17", hours: 3, note: "what i have learnt: "},
                {date: "2016-04-18", hours: 2, note: "what i have learnt: "},
            ]
            },
            {
                item: 'js', expect: 9, now: 6, details: [
                {date: "2016-04-19, 2016-05-05", hours: 6, note: "what i have learnt: "},
            ]
            },
            {
                item: 'data-binding', expect: 10, now: 7,
                details: [
                    {date: "2016-04-20", hours: 3, note: "what i have learnt: "},
                    {date: "2016-05-04", hours: 3, note: "what i have learnt: "}
                ],
                important: true
            },
            {
                item: 'directive', expect: 10, now: 6, details: [
                {date: "2016-04-21, 2016-04-30", hours: 16, note: "what i have learnt: "},
            ],
                important: true
            },
            {
                item: 'built in directive', expect: 9, now: 6, details: [
                {date: "2016-04-23", hours: 3, note: "what i have learnt: "},
            ],
                important: true
            },
            {
                item: 'route views', expect: 8, now: 4, details: [
                {date: "2016-04-24", hours: 3, note: "what i have learnt: "},
            ],
            },
            {
                item: 'ajax', expect: 10, now: 5, details: [
                {date: "2016-04-25", hours: 3, note: "what i have learnt: "},
            ],
                important: true
            },
            {
                item: 'provider', expect: 8, now: 5, details: [
                {date: "2016-04-26", hours: 3, note: "what i have learnt: "},
            ]
            },
            {
                item: 'DI', expect: 8, now: 5, details: [
                {date: "2016-04-27", hours: 3, note: "what i have learnt: "},
            ]
            },
            {
                item: 'testing', expect: 10, now: 4, details: [
                {date: "2016-04-28", hours: 3, note: "what i have learnt: "},
            ]
            },
            {
                item: 'design ', expect: 8, now: 5, details: [
                {date: "2016-04-20, 2016-05-06", hours: 8, note: "what i have learnt: "},
            ]
            },
            {
                item: 'tools and env', expect: 8, now: 4, details: [
                {date: "2016-05-03", hours: 3, note: "what i have learnt: "},
            ]
            }
        ]
    });
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});