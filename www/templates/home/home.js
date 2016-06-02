'Use Strict';

angular
	.module('brigade')
	.controller('homeCtrl', function($scope, $state, $location, $stateParams, $firebaseArray, Auth, FURL){

	// var index = $stateParams.id;
	var ref = new Firebase(FURL);

	$scope.games = $firebaseArray(ref.child("games"));

	// cannot log like this, asynch call and will not have value
	// console.log($scope.games);

	$scope.parsedDate = function(date){
		return Date.parse(date)
	} 


	// $scope.selectGame = function(){
	// 	var selectedGame = $scope.games[index];
	// 	return selectedGame;
	// }

	// $scope.createGame = function(game){
	// 	game.time = new Date().getTime();
	//   	game.uid = Auth.user.uid;
	//     console.log(game);
	//   	$scope.games.$add(game);
	//     $state.go("tab.home"); 
	// }	
	})