/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$
var $$ = function() {};
//第二种写法
$$.prototype = {
    $id:function(id){
        return document.getElementById(id)
    },
    //去除左边空格
    ltrim:function(){
        return str.replace(/(^\s*)/g,'');
    },
    //去除右边空格
    rtrim:function(){
        return str.replace(/(\s*$)/g,'');
    },
    //去除空格
    trim:function(){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //简单的数据绑定formateString
    formateString:function(str, data){
    return str.replace(/@\((\w+)\)/g, function(match, key){
        return typeof data[key] === "undefined" ? '' : data[key]});
},
    //arttemplate
    bindTemplate:function (data, Template) {
        var html = template(Template, data);
        return html
    },
    //使用artTemplate模板绑定数据
    // str：拼接的html 字符串
    // data：数据
    artTemplate:function (str,data){
        var render = template.compile(str);
        return render(data)
    },
    simpleQuery:function (){
        var params= window.location.search;//params:?id,date
        var arr = params.substring(1).split(",");
        return arr;
    },
    querystring:function(){//获取url查询字符串参数值的通用函数
        var str = window.location.search.substring(1);  //获取查询的字符串，即“id=1&name=location”的部分
        
        var arr = str.split("&");
        
        var json={};       //定义一个临时对象
        for(var i=0;i<arr.length;i++){  //遍历数组
            var c= arr[i].indexOf("="); // 获得每个参数键值对中=的下标
            if(c==-1) continue;         //如果没有发现测跳到下一次循环继续操作
            var k = arr[i].substring(0,c); //定义 = 之前的字符串 这里是 id name  
            var v = arr[i].substring(c+1); //定义 = 后面的字符串  这里是1 location等
             json[k]=v;     //以键值对的方式存储
        }
        return json;
    }
}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();

