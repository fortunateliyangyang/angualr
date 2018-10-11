(function (angular) {
'use strict';

	// 创建正在热映模块
	var module = angular.module("moviecat.movie_detail",['ngRoute','moviecat.services.http']);
	//配置模块路由
	module.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		.when('/detail/:id',{
			templateUrl:"movie_detail/view.html",
			controller:'movieDetailController'
		});
	}]);

	module.controller('movieDetailController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',

		function($scope,$route,$routeParams,HttpService,AppConfig){
			$scope.movie={},
			$scope.loading=true ;
			var id = $routeParams.id;
			var apiAddress = AppConfig.detailApiAddress+id;
			HttpService.jsonp(apiAddress,{},function(data){
				$scope.movie = data;
				$scope.loading=false
				$scope.$apply();
			})

      }])


})(angular)
