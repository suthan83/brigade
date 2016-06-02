'Use Strict';

angular
	.module('brigade')
	.controller('profileCtrl', function($scope, $state, $location, $stateParams, $firebaseObject, $localStorage, $firebaseArray, Auth, FURL){

var index = $stateParams.id;
var ref = new Firebase(FURL);

console.log(index);

$scope.selectUser = $firebaseObject(ref.child("profile/" + index));
// $scope.selectUser = function() {

// }
})