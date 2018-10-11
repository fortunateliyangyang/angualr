/*jsonp：1获取地址
         2.获得参数
         3.callback*/
(function(angular){
	'use strict'
	var http = angular.module('moviecat.services.http',[])
	//创建名为HttpService的自定义服务
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp=function(url,data,callback){

	    //将data转化为url字符串的形式
	    // {id:1,name:'zhangsan'} =>id=1&name=zhangsan
	    var querystring = url.indexOf('?')==-1? '?':'&'
	    for(var key in data){
	    	querystring +=key+'='+data[key]+'&';
	    }

	    //1.挂在回调函数
			//
		var fnsuffix = Math.random().toString().replace('.','')
	    var cbFuncName = 'my_json_cb'+fnsuffix;

	    //处理url中的回调函数
	    querystring += 'callback='+cbFuncName;


	    //创建script标签
	    var scriptElement = $document[0].createElement('script')
	    scriptElement.src = url+querystring;
	    //将script标签放在页面中

        $window[cbFuncName] = function(data) {
        callback(data);
        $document[0].body.removeChild(scriptElement);  //
      };
	    $document[0].body.appendChild(scriptElement);


		}
	}])

})(angular)
