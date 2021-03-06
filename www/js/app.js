// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('brigade', ['ionic', 'angularMoment', 'starter.controllers', 'starter.services', 'starter.directives', 'ionic.contrib.ui.tinderCards', 'firebase', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Changue this for your Firebase App URL.
.constant('FURL', 'https://brigadeapp.firebaseio.com/')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    /*WELCOME*/
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome/intro.html',
      controller: 'loginCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.post', {
    url: '/post/:id',
    views: {
      'home': {
        templateUrl: 'templates/home/post.html',
        controller: 'postCtrl'
      }
    }
  })

  .state('tab.me', {
    url: '/me',
    views: {
      'me': {
        templateUrl: 'templates/me/me.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.myprofile', {
    url: '/myprofile',
    views: {
      'me': {
        templateUrl: 'templates/me/profile.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile/:id',
    views: {
      'me': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'me': {
        templateUrl: 'templates/me/settings.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.network', {
    url: '/network',
    views: {
      'network': {
        templateUrl: 'templates/network/network.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.create', {
    url: '/create',
    views: {
      'create': {
        templateUrl: 'templates/create/create.html',
        controller: 'createCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');

});
