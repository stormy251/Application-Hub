//this is the main routing module for my applications hub page.

var routerApp = angular.module('routerApp', ['ngMaterial','ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
    //setting the configuration for the app as well as the UI routing.
    
    //this is to make all theme changes happen at once.
    $mdThemingProvider.alwaysWatchTheme(true);
    
    //This is selecting the default theming of the entire site.
    $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('pink');
    $mdThemingProvider.theme('redIndigo').primaryPalette('red').accentPalette('indigo');
    $mdThemingProvider.theme('greenIndigo').primaryPalette('green').accentPalette('indigo');

    //root view - this just points the user to the home page.
    $stateProvider.state('root',{
        url:'',
        templateUrl: 'home.html'
    });
    
    //Setting the Route for the Main page.
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'home.html'
    });
    
    //setting the Route for the Theme Manager page
    $stateProvider.state('themeManager',{
        url:'/themeManager',
        templateUrl: 'themeManager.html'
    });
    
    //Setting the Route for the Weather App page
    $stateProvider.state('weatherApp',{
        url:'/weatherApp',
        templateUrl: 'weatherApp.html'
    });
    
    //Setting the Route for the flickr search page
    $stateProvider.state('flickrSearch',{
        url:'/flickrSearch',
        templateUrl: 'flickrSearch.html',
        controller: function($scope,$http){
            $scope.search = function(){
            $scope.isSearching = true;
            
            $http({
                method: 'GET',
                url: 'https://api.flickr.com/services/rest',
                params: {
                    method: 'flickr.photos.search',
                    api_key: '67eb66416a193c7185c764ad778fe1e4',
                    text: $scope.searchTerm,
                    format: 'json',
                    nojsoncallback: 1
                }
            }).success(function(data){
                $scope.results = data;
                $scope.isSearching = false;
            }).error(function(error){
                console.error(error);
                $scope.isSearching = false;
            });
        };   
        }
    });
});

//this is the main controller for the templated page aka the top bar and sidenav and botnav
routerApp.controller('ListController',  function($scope, $http, $timeout, $location, $anchorScroll, $mdSidenav, $log, $mdBottomSheet){
    
    //Selecting the theme
    $scope.themeName = 'default';
    
    //Change the theme
    $scope.changeTheme = function(name){
        $scope.themeName = name;
    };
    
    //setting the color of the backdrop for the cards
    $scope.backgroundcolor = "#F2F2F2";
    
    //setting the background color of the cards to white so they pop
    $scope.cardBackGround = "#FFFFFF";
    
    //setting the home page title
    $scope.pageName = "HOME";
    
    
    
    $scope.showGridBottomSheet = function($event){
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-grid.html',
            controller: 'GridBottomSheetCtrl',
            targetEvent: $event
        })  
    };
    
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
    };

});

//this is the bottomsheet controller
routerApp.controller('GridBottomSheetCtrl',function($scope, $mdBottomSheet){
    $scope.close = function(){
        $mdBottomSheet.hide();
    };
});

//this is the controller that allows the close function to apply to close the opened instance of the side nav.
routerApp.controller('LeftCtrl',function($scope, $http, $timeout, $mdSidenav, $log){
    $scope.close = function() {
    $mdSidenav('left').close().then(function(){
        $log.debug("close LEFT is done");
      });
    };
});
