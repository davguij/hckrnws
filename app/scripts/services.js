	'use strict';

	angular.module('Hckrnws')
	    .service('MainService', function($http) {
	        this.loadItem = function(urlToLoad) {
	            // embedly API key
	            var key = "e8316305a2b74f88bf7597d485af41f8";
	            var url = "http://api.embed.ly/1/extract?key=" + key + "&url=" + encodeURIComponent(urlToLoad);
	            // console.log(url);
	            var req = $http.get(
	                url
	            );
	            return req;
	        };

	        this.calculateMaxScore = function(scores) {
	            scores.sort(function(a, b) {
	                return b - a
	            });
	            return scores[0];
	        }

	        this.calculateMinScore = function(scores) {
	            scores.sort(function(a, b) {
	                return b - a
	            });
	            return scores[scores.length - 1];
	        }

	    });
