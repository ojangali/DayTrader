'use strict';

angular.module('day-trader', ['firebase'])
  .run(['$rootScope', '$window',function($rootScope, $window){
    $rootScope.fbRoot = new $window.Firebase('https://day-trader-o.firebaseio.com/');
  }])
  .controller('master', ['$scope', '$firebaseObject', '$firebaseArray', '$http', function($scope, $firebaseObject, $firebaseArray, $http){
    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + stock + '&callback=JSON_CALLBACK').then(function(response){
      var fbUser = $scope.fbRoot.child('user');
      var afUser = $firebaseObject(fbUser);
      $scope.user = afUser;
      var fbStock = $scope.fbRoot.child('stock');
      var afStock = $firebaseObject(fbStock);
      $scope.stock = afStock;
      var stock = $scope.symbol;
      $scope.saveInfo = function(){
        $scope.user.$save();
        $scope.showUserFormShowing = false;
      };
      $scope.showUserForm = function(){
        $scope.showUserFormShowing = true;
      };
      $scope.purchase = function(){
        $scope.stock.$save();
        console.log($scope.symbol);
      };

    });
  }]);
