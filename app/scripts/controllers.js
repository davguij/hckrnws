	'use strict';

	angular.module('Hckrnws')
	    .controller('MainController', function($scope, $firebase, $q, MainService) {

	        var topStoriesReq = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
	        var topStoriesSync = $firebase(topStoriesReq);
	        // download the data into a local object
	        var topStories = topStoriesSync.$asArray();
	        // $scope.content = [];
	        $scope.content = [{
	            "image": "http://lorempixel.com/1024/768",
	            "title": "This is a test",
	            "body": "Lorem ipsum y tal y tal"
	        }, {
	            "image": "http://lorempixel.com/1024/768",
	            "title": "This is the second element of the test",
	            "body": "Lorem ipsum y tal y tal"
	        }]
	        topStories.$loaded(
	            function(loadedData) {
	                // vamos a cargar solo 3 para no cepillarnos todas las llamadas a la API en un dia!
	                // var max = loadedData.length;
	                var max = 0;
	                for (var i = 0; i < max; i++) {
	                    var storyID = loadedData[i].$value;
	                    var baseUri = "https://hacker-news.firebaseio.com/v0/item/";
	                    var reqUri = baseUri + storyID;
	                    var storyReq = new Firebase(baseUri + storyID);
	                    var storySync = $firebase(storyReq);
	                    var story = storySync.$asObject();
	                    var scores = [];
	                    var maxScore, minScore, avgScore;
	                    story.$loaded(
	                        function(loadedStory) {
	                            scores.push(loadedStory.score);
	                            if (scores.length === max) {
	                                maxScore = MainService.calculateMaxScore(scores);
	                                minScore = MainService.calculateMinScore(scores);
	                                avgScore = (maxScore + minScore) / 2;
	                            }
	                            MainService.loadItem(loadedStory.url).then(function(response) {
	                                response.data.hnScore = loadedStory.score;
	                                response.data.columns = Math.round((loadedStory.score / avgScore) * 8);
	                                if (response.data.columns < 3) {
	                                    response.data.columns = 3;
	                                } else if (response.data.columns > 16) {
	                                    response.data.columns = 16;
	                                }
	                                console.log(response.data);
	                                $scope.content.push(response.data);
	                            });
	                        }
	                    );
	                }
	            }
	        );
	        console.log($scope.content);
	    })
