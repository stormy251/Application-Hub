//this is the controller that allows the close function to apply to close the opened instance of the side nav.
routerApp.controller('LeftCtrl',function($scope, $http, $timeout, $mdSidenav, $log){
    $scope.close = function() {
    $mdSidenav('left').close().then(function(){
        $log.debug("close LEFT is done");
      });
    };
});