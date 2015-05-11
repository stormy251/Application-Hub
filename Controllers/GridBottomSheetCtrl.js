//this is the bottomsheet controller
routerApp.controller('GridBottomSheetCtrl',function($scope, $mdBottomSheet){
    $scope.close = function(){
        $mdBottomSheet.hide();
    };
});