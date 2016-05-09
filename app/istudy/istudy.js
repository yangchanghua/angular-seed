'use strict';

angular.module('myApp.istudy', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/istudy', {
            templateUrl: 'istudy/istudy.html',
            controller: 'StudyRecordCtrl'
        });
    }])

    .controller('StudyRecordCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.user = {
            name: 'ych'
        };

        $scope.recordsString = function () {
            return JSON.stringify($scope.studyRecords);
        };

        function makeEstimation(item) {
            var a = item.percent / Math.log(item.spent);
            return Math.exp(1.0/a) - item.spent;
        }

        function analyze (item) {
            item.spent = spentOnItem(item.details);
            item.percent = item.now/item.expect;
            item.estimate = makeEstimation(item);
        }

        function spentOnItem (itemDetails) {
            return itemDetails.map(function (v) {
                return v.hours;
            }).reduce(function (prev, curr){
                return prev + curr;
            }, 0);
        }
        

        $scope.studyRecords = {
            totalPercent: function () {
                return this.progresses.map(function (v) {
                    return v.percent;
                }).reduce(function (total, v) {
                    return total + v;
                }, 0)/this.progresses.length;
            },
            totalSpent: function () {
                return this.progresses.map(function (v) {
                    return v.spent;
                }).reduce(function (a, b) {
                    return a + b;
                }, 0);
            },
            totalEstimation: function () {
                return this.progresses.map(function (v) {
                    return v.estimate;
                }).reduce(function (a, b) {
                    return a + b;
                }, 0);
            },
            theme: ['web', 'java', 'javascript', 'front end', 'angularJS'],
            goal: 'expert level in angularJS',
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
        };

        $scope.studyRecords.progresses.forEach(function (v) {
            analyze(v);
        });
        $scope.save = function () {
            $http.put('/records.json', $scope.studyRecords).then (function () {
                console.log('saved');
            }, function (response) {
                console.log('save failed: ' + response.data);
            })
        }

        function getRecords() {
            $http.get('/records').then(function (res) {
                $scope.studyRecords = res.data;
                
            }, function (res) {
                alert('error in loading records' + res.data);
            });
        }
        getRecords();
        console.log($scope.studyRecords.totalEstimation());
    }
    ]);
