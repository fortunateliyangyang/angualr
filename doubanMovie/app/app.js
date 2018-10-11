	'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
	'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movieList',
  'moviecat.directives.autoFocus',

])
.constant('AppConfig',{   //设置全局变量
	pageSize:10,
	listApiAddress:'https://api.douban.com/v2/movie/',
	detailApiAddress:'https://api.douban.com/v2/movie/subject/'
})
.config(['$routeProvider', function($routeProvider) {

//缓存配置
$routeProvider.otherwise({redirectTo: '/in_theaters/1'});

}])

.controller('searchController',[
	'$scope',
	'$route',
	'AppConfig',
	function($scope,$route,AppConfig){
  console.log(AppConfig)
	$scope.input=''
	$scope.search = function(){
		// console.log($scope.input)
        $route.updateParams({category:'search',q:$scope.input})
		}
}])
.run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    })
});

