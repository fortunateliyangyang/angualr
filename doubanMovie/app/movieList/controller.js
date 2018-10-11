(function (angular) {
'use strict';

	// 创建正在热映模块
	var module = angular.module("moviecat.movieList",['ngRoute','moviecat.services.http']);
	//配置模块路由
	module.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		.when('/:category/:page',{
			templateUrl:"movieList/view.html",
			controller:'movieListController'
		});
	}]);

	module.controller('movieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',

		function($scope,$route,$routeParams,HttpService,AppConfig){
			//计算页数
			var page = parseInt($routeParams.page)   //当前是第几页
			var count = AppConfig.pageSize;    //每一页的条数
			var start = (page-1)*count
      $scope.loading=true    //开始加载
      $scope.subject = [];
      $scope.message='';
      $scope.title='Loading...'
      $scope.totalPages=0;
      $scope.currentPage=page;
      HttpService.jsonp(AppConfig.listApiAddress+ $routeParams.category,
      	//$routeParams 数据来源 1.
      {start:start,count:count,q:$routeParams.q},
      function(data){
      	$scope.title=data.title
      	$scope.subjects=data.subjects;
      	$scope.totalCount = data.total
      	$scope.totalPages= Math.ceil($scope.totalCount/count)
      	$scope.loading=false
      	$scope.$apply()
      })

      //翻页行为
      $scope.go=function(page){
      	//更新路由传过来的值
      	if(page>=1&&page<=$scope.totalPages){
      		$route.updateParams({page:page});
      	}
      }


      // //测试$http服务
      // $http.get('/app/datas/in_theaters.json').then(function(response){
      // 	//异步请求结束后执行的代码
      // 	if(response.status==200){
      // 		$scope.subjects=response.data.subjects;
      // 	}else{
      // 		$scope.message = '获取数据错误，错误信息'+response.statusText
      // 	}
      // },function(err){
      // 	$scope.message='获取数据错误'+err.statusText
      // })


	}])
})(angular)
