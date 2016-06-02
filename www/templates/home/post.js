'Use Strict';

angular
	.module('brigade')
	.controller('postCtrl', function($scope, $state, $location, $stateParams, $firebaseObject, $localStorage, $firebaseArray, Auth, FURL){

	var index = $stateParams.id;
	var ref = new Firebase(FURL);

	//setting up the service 
	$scope.comments = $firebaseArray(ref.child("comments"));

	//syncd data
	$scope.selectGame = $firebaseObject(ref.child("games/" + index));

	ref.child('games/'+ index + '/game').once('value', function(snap) {
		console.log("snapppp > " + snap);
		$scope.gamers = snap.numChildren();
	});


	//not sync w firebase
	// ref.child('games/'+index).once('value', function(snap) {
	// 	$scope.selectGame = snap.val();
	// 	console.log($scope.selectGame);
	// })

	// cannot log like this, asynch call and will not have value
	// console.log($scope.games);

	$scope.parsedDate = function(date){
		return Date.parse(date)
	} 


	//adds/removes user to Favorites node for current game if they haven't indicated so already
	$scope.interested = function() {

		if(!$scope.userInInterested()){
			ref.child('games/' + index + '/interested').push({
				uid: Auth.user.uid,
				key: $localStorage.userkey,
				gravatar: 'img/adam.jpg'
				//Auth.user.profile.gravatar
			})
		} else {
			ref.child('games/' + index + '/interested/' + $scope.userKey).remove()
		}
	}

	// adds/removes user to Game node for current game if they haven't indicated so already
	// increments/decrements the players count as well
	$scope.game = function() {

		if (!$scope.userInGame()) {
			ref.child('games/' + index + '/game').push({
			uid: Auth.user.uid,
			key: $localStorage.userkey,
			gravatar: 'img/adam.jpg'
			//Auth.user.profile.gravatar
		})
		$scope.gamers += 1;
		} else {
			// **FIX** need to update to only remove the signed-in user
			ref.child('games/' + index + '/game/' + $scope.userKey).remove()
			$scope.gamers -= 1;
		}
	}

	//checks if signedIn user is game for current game - returns t/f
	$scope.userInGame = function() {
		var gameUsers = $scope.selectGame.game;
		
		for(var key in gameUsers){
			if (gameUsers[key].uid === Auth.user.uid) {
				$scope.userKey = key;
				return true;
			} 
		}
		return false;
	}

	//checks if signedIn user is interested in current game - returns t/f
	$scope.userInInterested = function() {
		var intUsers = $scope.selectGame.interested;
		
		for(var key in intUsers){
			if (intUsers[key].uid === Auth.user.uid) {
				$scope.userKey = key;
				return true;
			} 
		}
		return false;
	}

	// probably don;t need this function... ngShow based on above two functions
	$scope.showMoreDetails = function(){
		var intUsers = $scope.selectGame.interested;
		var gameUsers = $scope.selectGame.game;
		
		for(var key in intUsers){
			if (intUsers[key].uid === Auth.user.uid | $scope.gameUsers[key].uid === Auth.user.uid) {
				return true;
			}
		}
		return false;
	}
	// hide show based on the above + I'm game users

	$scope.games = $firebaseArray(ref.child("games"));
	

	console.log($localStorage.userProfile);
	// add user comment to firebase
	$scope.addComment = function(comment) {
		console.log($localStorage.userkey);

		ref.child('profile/' + $localStorage.userkey).once("value", function(snap){
			$scope.userName = snap.val().fname;

			// console.log("inside addComment");
		// console.log($firebaseObject(ref.child('profile').child(Auth.user.uid).$id));
		comment.time = new Date().getTime();
		comment.uid = Auth.user.uid;
		comment.name = $scope.userName;
		$scope.comments.$add(comment);
		comment.text = "";

		})		
	};	
})