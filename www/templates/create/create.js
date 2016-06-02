'Use Strict';

angular
	.module('brigade')
	.controller('createCtrl', function($scope, $state, $location, $firebaseArray, Auth, FURL){

	var ref = new Firebase(FURL);

	$scope.games = $firebaseArray(ref.child("games"));

	$scope.createGame = function(game){
		game.time = new Date().getTime();
	  	game.uid = Auth.user.uid;
	  	game.startDate = game.date.toString();
	    console.log(game);
	  	$scope.games.$add(game);
	    $state.go("tab.home"); 
	}	
	})