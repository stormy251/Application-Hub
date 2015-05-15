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
        templateUrl: 'Views/home.html'
    });
    
    //Setting the Route for the Main page.
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'Views/home.html'
    });
    
    //setting the Route for the Theme Manager page
    $stateProvider.state('themeManager',{
        url:'/themeManager',
        templateUrl: 'Views/themeManager.html'
    });
    
    //Setting the Route for the Weather App page
    $stateProvider.state('weatherApp',{
        url:'/weatherApp',
        templateUrl: 'Views/weatherApp.html',
        controller: function($scope, $mdToast, $animate, weatherService,$log) {
          function fetchWeather(zip) {
            weatherService.getWeather(zip).then(function(data){
              $scope.place = data;
              $scope.showSimpleToast();
            }); 
          }

          $scope.showSimpleToast = function() {
            $mdToast.show(
              $mdToast.simple()
                .content("Weather Info was pulled for " + $scope.place.location.city + ', ' + $scope.place.location.region)
                .position('top right')
                .hideDelay(5000)
            );
          };
            
          $scope.findWeather = function(zip) {
            fetchWeather(zip);
          };
            
          $scope.showLocation = false;

        }
    });
    
    //Setting the Route for the Snap App page
    $stateProvider.state('greenSock',{
        url:'/greenSock',
        templateUrl: 'Views/greenSock.html'
    });
    
    //Setting the Route for the flickr search page
    $stateProvider.state('flickrSearch',{
        url:'/flickrSearch',
        templateUrl: 'Views/flickrSearch.html',
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
routerApp.controller('MainController',  function($scope, $http, $timeout, $location, $anchorScroll, $mdSidenav, $log, $mdBottomSheet){
    
    //this function is used to determine wheather to show the Scroll up carrot on the title bar or not.
    $log.warn($location.url());
    $scope.showCarrot = function(){
        return($location.url() === '/flickrSearch' || $location.url() === '/flickrSearch#searchBar');
    };
    
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
    
    
    //this function will allow the user to trigger the open grid bottom sheet tab
    $scope.showGridBottomSheet = function($event){
        $mdBottomSheet.show({
            templateUrl: 'Views/bottom-sheet-grid.html',
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
    
    //just called when a page change is triggered
    $scope.changePageName = function(name){
        $scope.pageName = name;    
    };

    //this is a array list of the side navigation links
    $scope.sideNavLinks = [
    {
        pageName: 'HOME',
        siteName: 'home',
        thumbNailPath: 'bower_components/icons/ic_home_24px.svg',
        linkText: 'Home'
    },
    {
        pageName: 'FLICKR SEARCH',
        siteName: 'flickrSearch',
        thumbNailPath: 'bower_components/icons/ic_camera_alt_24px.svg',
        linkText: 'Flickr Search'
    },
    {
        pageName: 'THEME MANAGER',
        siteName: 'themeManager',
        thumbNailPath: 'bower_components/icons/ic_color_lens_24px.svg',
        linkText: 'Theme Manager'
    },
    {
        pageName: 'WEATHER APP',
        siteName: 'weatherApp',
        thumbNailPath: 'bower_components/icons/ic_cloud_24px.svg',
        linkText: 'Weather App'
    },
    {
        pageName: 'GREENSOCK DEMO',
        siteName: 'greenSock',
        thumbNailPath: 'bower_components/icons/ic_details_24px.svg',
        linkText: 'Greensock App'
    }
    ];
});



