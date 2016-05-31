'Use Strict';
angular.module('starter').controller('loginCtrl', function ($scope, $state, $ionicModal,$localStorage, $location, $http, $ionicPopup, $firebaseArray, $firebaseObject, Auth, FURL, Utils) {
  
  // Login modal
  $ionicModal.fromTemplateUrl('templates/welcome/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
  $scope.openLogin = function() {
    $scope.modalLogin.show();
  };
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };

  // Sign up modal
  $ionicModal.fromTemplateUrl('templates/welcome/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });
  $scope.openRegister = function() {
    $scope.modalRegister.show();
  };
  $scope.closeRegister = function() {
    $scope.modalRegister.hide();
  };

  var ref = new Firebase(FURL);
  var userkey = "";
  $scope.signIn = function (user) {
    console.log("Enviado");
    if(angular.isDefined(user)){
    Utils.show();
    
    Auth.login(user)
      .then(function(authData) {
      console.log("id del usuario:" + JSON.stringify(authData));
      ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
        console.log(authData);
        console.log(snapshot.key());
        userkey = snapshot.key();
        var obj = $firebaseObject(ref.child('profile').child(userkey));

        obj.$loaded()
          .then(function(data) {
            console.log(data === obj); // true
            console.log(obj.email);
            $localStorage.email = obj.email;
            $localStorage.userkey = userkey;

              Utils.hide();
              $state.go('tab.home');
              $scope.closeLogin();
              console.log("Starter page","Home");

          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      });

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de loguear:" + JSON.stringify(user));
         Utils.alertshow("Successfully","The User was Successfully Created.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };
  
  $scope.loginWithGoogle =  function(){
    
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $state.go('home');
  }
  }
  );
  };
  
  $scope.loginWithFacebook =  function(){
    
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $state.go('home');
  }
  }
  );
  };
  
  $scope.loginWithTwitter =  function(){
    
ref.authWithOAuthPopup("twitter", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    // var profileRef = $firebaseArray(ref.child('profile'));
    // profileRef.$add(authData.twitter.username);
    $state.go('tab.home');
    $scope.closeLogin();
  }
  }
  );
  };


});
