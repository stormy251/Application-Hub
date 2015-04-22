//this is the main routing module for my applications hub page.

var routerApp = angular.module('routerApp', ['ngMaterial','ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
    //setting the configuration for the app as well as the UI routing.
    
    //This is selecting the default theming of the entire site.
    $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('green');
    
    //Setting the Route for the Main page.
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'home.html'
    });
});

routerApp.controller('ListController',  function($scope, $http, $timeout, $location, $anchorScroll, $mdSidenav, $log){
    
    //setting the color of the backdrop for the cards
    $scope.backgroundcolor = "#F2F2F2";
    
    //setting the background color of the cards to white so they pop
    $scope.cardBackGround = "#FFFFFF";
    
    //setting the home page title
    $scope.pageName = "HOME";
    
    //this is the static carat in the top bar that lets the user set focus to the top.
    $scope.goToTop = function() {
        // set the location.hash to the id of the element you wish to scroll to.

        $location.hash('searchBar');

        //call $anchorScroll()
        $anchorScroll();
        $log.debug("autoscroll complete");
    };
    
    //this function is used to close the left hand side nav bar.
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle().then(function(){
              $log.debug("toggle left is done");
          });
      };
    
    $scope.changePageName = function(name){
        $scope.pageName = name;    
    }

});

//this is the controller that allows the close function to apply to close the opened instance of the side nav.
routerApp.controller('LeftCtrl',function($scope, $http, $timeout, $mdSidenav, $log){
    $scope.close = function() {
    $mdSidenav('left').close().then(function(){
        $log.debug("close LEFT is done");
      });
    };
});
