//this is the main routing module for my applications hub page.

var routerApp = angular.module('routerApp', ['ngMaterial','ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'home.html'
    });
});

routerApp.controller('ListController',  function($scope, $http, $timeout, $location, $anchorScroll, $mdSidenav, $log){
    
    $scope.goToTop = function() {
        // set the location.hash to the id of the element you wish to scroll to.

        $location.hash('searchBar');

        //call $anchorScroll()
        $anchorScroll();
        $log.debug("autoscroll complete");
    };

    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle().then(function(){
              $log.debug("toggle left is done");
          });
      };

});

routerApp.controller('LeftCtrl',function($scope, $http, $timeout, $mdSidenav, $log){
    $scope.close = function() {
    $mdSidenav('left').close().then(function(){
        $log.debug("close LEFT is done");
      });
    };
});
