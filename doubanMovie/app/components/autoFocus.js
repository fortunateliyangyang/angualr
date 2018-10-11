(function(angular){
	angular.module('moviecat.directives.autoFocus',[])
	  .directive('autoFocus',['$location',function($location){

	      return{

	      	restrict:'A',
	      	link:function($scope,iElm,iAttrs,controller){
	      		$scope.$location=$location;
	      		$scope.$watch('$location.path()',function(now){
	      			//console.log($location.path())  == /coming_soon/1
	      			var alink = iElm.children().attr('href')
	      			var type = alink.replace(/#(\/.+?)\/\d+/, '$1');  // console.log(type)== /coming_soon
	      			//访问当前链接
	      			//now 是path()变化后的值
	      			if(now.startsWith(type)){
	      				iElm.parent().children().removeClass('active');
	      				iElm.addClass('active')
	      			}
	      		})

	      	}
	      }
	  }])
})(angular)
