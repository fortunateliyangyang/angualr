var $$ = function () {
}
$$.prototype = {
    $id: function (id) {
        return document.getElementById(id)
    },
    /*  去除左边空格*/
    ltrim: function (str) {
        return str.replace(/(^\s*)/g, '');
    },
    /*去除右边空格*/
    rtim: function (str) {
        return str.replace(/(\s*$)/g, '');
    },
    //去除空格
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //ajax
    myAjax: function (url, fn) {
        var xhr = createXHR();
        xhr.onreadystatechange = function () {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                fn(xhr.responseText)
            } else {
                alert("错误的文件")
            }
        }
        xhr.open("get", url, true);
        xhr.send();

        function createXHR() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                        i;
                    for (i = 1; i < versions.length; i++) {
                        try {
                            new ActiveXObject(version[i])
                            arguments.callee.actieXString = version[i];
                            break;
                        } catch (e) {

                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            }
            else {
                throw new Error("No xhr object available");
            }
        }
    },
    //tab切换
    tab: function (id) {
        //如何获取某个父元素下面的子元素
        var box = document.getElementById(id);
        var spans = box.getElementsByTagName('span');
        var lis = box.getElementsByTagName('li');
        //群体绑定事件  -- 对所有的span绑定事件
        //群体绑定事件
        for (var i = 0; i < spans.length; i++) {
            spans[i].index = i;
            spans[i].onmouseover = function () {
                spans[i].className = "";
                lis[i].className = "";
            }
            this.className = "select"
            lis[this.index].className = "select"
        }
    },
    //随机数
    dom: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    //简单的数据绑定
    formateString: function (str, data) {
        return str.replace(/@\((\w+)\)/g, function (match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    },
    //给一个对象扩充功能
    extendMany: function () {
        var key, i = 0, len = arguments.length, target = null, copy;
        if (len = 0) {
            return;
        } else {
            i++;
            target = arguments[0];
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    extend: function (target, source) {
        for (var i in source) {
            target[i] = source[i];
        }
        return target;
    },
    //数据类型检测
    isBoolean: function (val) {
        return typeof val === "boolean";
    },
    isString: function (val) {
        return typeof val === "string";
    },
    isNumber: function (val) {
        return typeof val === 'number' && isFinite(val)
    },
    isUndefined: function (val) {
        return typeof val === "undefined";
    },
    isObj: function (val) {
        if (str === null || typeof str === 'undefined') {
            return false;
        }
        return typeof str === 'object';
    },
    isNull: function (val) {
        return val === null;
    },
    isArray: function (val) {
        if (arr === null || typeof arr === 'undefined') {
            return false;
        }
        return arr.constructor === Array;
    },

}
$$ = new $$();
//封装常用事件
$$.extend($$, {
    /*绑定事件*/
    on: function (id, type, fn) {
        var dom = $$.isString(id) ? document.getElementById(id) : id;
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false)
        }
        else if (dom.attachEvent) {
            dom.attachEvent("on" + type, fn);
        }
    },
    /*解除绑定*/
    un: function (id, type, fn) {
        var dom = $$.isString(id) ? document.getElementById(id) : id;
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn);
        } else if (dom.detachEvent) {
            dom.detachEvent(type, fn);
        }
    },
    /*点击*/
    click: function (id, fn) {
        this.on(id, 'click', fn);
    },
    /*鼠标移上*/
    mouseover: function (id, fn) {
        this.on(id, 'mouseover', fn);
    },
    /*鼠标离开*/
    mouseout: function (id, fn) {
        this.on(id, 'mouseout', fn);
    },
    /*悬浮*/
    hover: function (id, fnOver, fnOut) {
        if (fnOver) {
            this.on(id, "mouseover", fnOver);
        }
        if (fnOut) {
            this.on(id, "mouseout", fnOut);
        }
    },
    /*事件委托*/
    delegate: function (pid, eventType, selector, fn) {
        var parent = $$.$id(pid);

        function handle(e) {
            var target = $$.GetTarget(e);
            if (target.nodeName.toLocaleLowerCase() === selector || target.id === selector || target.className.indexOf(selector) != -1) {
                fn.call(target);
            }
        }

        parent[eventType] = handle;
    },

    //事件基础
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取目标
    GetTarget: function (event) {
        var e = $$.getEvent(event);
        return e.target || e.srcElement;
    },
    //组织默认行为
    preventDefault: function (event) {
        var e = $$.getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        var e = $$.getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
})
//选择框架
$$.extend($$, {
    /*标签选择器*/
    $tag: function (tag, context) {
        if (typeof context == "string") {
            context = $$.$id(context);
        }
        if (context) {
            return context.getElementsByTagName(tag)
        } else {
            return document.getElementsByTagName(tag)
        }
    },
    /*class选择器*/
    $class: function (className, context) {
        var dom, elements;
        //如果传递过来的是字符串，则转换成元素对象
        if ($$.isString(context)) {
            context = document.getElementById(context)
            console.log(context)
        } else {
            context = document;
        }
        //如果兼容getElementByClassName

        if (context.getElementsByClassName) {
            return context.getElementsByClassName(className)

        } else {
            dom = context.getElementsByTagName("*")
            for (var i = 0; i < dom.length; i++) {
                if (dom[i].className && dom[i].className == className) {
                    elements.push(dom[i])

                }
            }
        }
        return elements;
    },
    /*分组选择器*/
    $group: function (content) {
        var result = [], dom = [];
        var arr = $$.trim(content).split(",");
        for (var i = 0; i < arr.length; i++) {
            var item = $$.trim(arr[i])
            var first = item.charAt(0);
            var index = item.indexOf(first)
            if (first === ".") {
                dom = $$.$class(item.slice(index + 1))
                pushArray(dom, result)
            } else if (first === "#") {
                dom = [$$.$id(item.slice(index + 1))]
                pushArray(dom, result);
            } else {
                dom = $$.$tag(item)
                pushArray(dom, result)
            }
        }
        return result;

        function pushArray(doms, result) {
            for (var j = 0; i < doms.length; j++) {
                result.push(doms[j])
            }
            ;
        };
    },
    /*层次选择器*/
    $cengci: function (select) {
        var result=[];
        var  context = [];
        var arr = $$.trim(select).split(" ");
        for (var i = 0; i < arr.length; i++) {
            var result=[];
            var item = $$.trim(arr[i]);
            var first = item.charAt(0);
            var index = item.indexOf(first);
            /*如果是#*/
            if (first === "#") {
                pushArray([$$.$id(item.slice(index + 1))])
                context = result
                console.log("#")
            }
            /*如果是.*/
            else if (first === ".") {
                if (context.length) {     //有多个id，context.length!=0,遍历每个id子代添加类
                    for (var j = 0; j < context.length; j++) {
                        pushArray($$.$class(item.slice(index + 1), context[j]))
                        console.log("。。")
                    }
                } else {  //没有id元素context.length = 0,直接添加类
                    pushArray($$.$class(item.slice(index + 1), context[j]))
                    console.log("..")
                }
            } else {
                if (context.length) {
                    for (var j = 0; j< context.length; j++) {
                        pushArray($$.$tag(item, context[j]));
                        console.log("tags")
                    }
                } else {
                    pushArray($$.$tag(item));
                    console.log("tag")
                }
                context=result;
            }
        }
        return context;
    function pushArray(doms) {
      for (var j = 0; j < doms.length; j++) {
        result.push(doms[j])
    };
};
},
    /*多组+层次*/
    $select:function(str){
        var result=[];
        var item=$$.trim(str).split(",");
        for(var i=0;i<item.length;i++){
            var select = $$.trim(item[i])
            var content = [];
            content = $$.$cengci(select)
            pushArry(content)
            console.log("返回")
        }

        return result;
        function pushArry(dom){
            for(var j=0;j<dom.length;j++){
                result.push(dom[j])
            }
        }
    },
    /*html5shi实现的选择器*/
    $all:function(selector,context){
        context = context || document;
        return  context.querySelectorAll(selector);
    },

})
//封装css框架
$$.extend($$,{
    //样式
   css:function(content,key,value){
       var dom = $$.isString(content)? $$.$all(content):content;
       /*如果content是数组*/
       if(dom.length){
           /*如果是设置样式*/
           if(value){
               for(var i=0;i<dom.length;i++){
                   setStyle(dom[i],key,value);
               }
           }else{  //获取
               return getStyle(dom[0]);
           }
       }else {
           if(value){
               setStyle(dom,key,value)
           }else{
               return getStyle(dom[0])
           }

       }

       function setStyle(dom,key,value){
           dom.style[key]=value;
       };
       function getStyle(dom) {
           if(dom.currentStyle){
               return dom.currentStyle[key]
           }else{
               return getComputedStyle(dom,null)[key];
           }

       }
   },
    cssNum:function (context, key) {
        return parseFloat($$.css(context, key))
    },
    //元素高度宽度概述
    //计算方式：clientHeight clientWidth innerWidth innerHeight
    //元素的实际高度+border，也不包含滚动条
    Width:function (id){
        return $$.$id(id).clientWidth
    },
    Height:function (id){
        return $$.$id(id).clientHeight
    },


    //元素的滚动高度和宽度
    //当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
    //计算方式 scrollwidth
    scrollWidth:function (id){
        return $$.$id(id).scrollWidth
    },
    scrollHeight:function (id){
        return $$.$id(id).scrollHeight
    },


    //元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
    //计算方式 scrollTop scrollLeft
    scrollTop:function (id){
        return $$.$id(id).scrollTop
    },
    scrollLeft:function (id){
        return $$.$id(id).scrollLeft
    },

    //获取屏幕的高度和宽度
    screenHeight:function (){
        return  window.screen.height
    },
    screenWidth:function (){
        return  window.screen.width
    },


    //文档视口的高度和宽度
    wWidth:function (){
        return document.documentElement.clientWidth
    },
    wHeight:function (){
        return document.documentElement.clientHeight
    },
    //文档滚动区域的整体的高和宽
    wScrollHeight:function () {
        return document.body.scrollHeight
    },
    wScrollWidth:function () {
        return document.body.scrollWidth
    },
    //获取滚动条相对于其顶部的偏移
    wScrollTop:function () {
        var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
        return scrollTop
    },
    //获取滚动条相对于其左边的偏移
    wScrollLeft:function () {
        var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
        return scrollLeft
    },
    offset:function(id){
       var dom = $$.$id(dom)
        return{top:offsetTop(dom),left:offsetLeft(dom)}
       function offsetLeft(dom){
           return dom.offsetLeft
       }
       function offsetTop(dom){
           return dom.offsetTop
       }
    },
    position:function (id) {
       function  absolateLeft(id) {
           var dom = $$.$id(id);
           var left = $$.offset(id).left;
           var parent = dom.offsetParent;
           while(parent!==null){
               left += parent.offsetLeft;
               parent = parent.offsetParent;
           }
           return left;

           function absolateTop(id){
               var dom = $$.$id(id)
               var top = $$.offset(id).top;
               var parent = dom.offsetParent;
               while (parent !== null){
                   top += parent.offsetTop;
                   parent = parent.offsetParent;
               }
               return top;
           }
           return {top:absolateTop(id),left:absolateLeft(id)}

       }

    }

})
//封装属性框架
$$.extend($$,{
    //属性操作，获取属性的值，设置属性的值 at tr（'test','target','_blank'）
    attr:function (content,key,value) {
        var doms = $$.$all(content);
        if (value.length) {
            if (value) {
                for (var i = 0; i < doms.length; i++) {
                    doms[i].setAttribute(key, value)
                }
            } else {
                return doms[0].getAttribute(key)
            }
        } else {
            if (value) {
                doms.setAttribute(key, value)
            }
            else
                {
                    return doms.getAttribute(key)
                }

        }
    },
    //动态添加和移除class
    addClass:function (content,name) {
        var doms = $$.$all(content);
        //如果获取的是集合
        if(doms.length){
            for(var i= 0,len=doms.length;i<len;i++){
                addName(doms[i]);
            }
            //如果获取的不是集合
        }else{
            addName(doms);
        }
        function addName(dom){
            dom.className = dom.className + ' ' + name;
        }
    },
    removeClass:function (context, name) {
        var doms = $$.$all(context);
        if (doms.length) {
            for (var i = 0, len = doms.length; i < len; i++) {
                removeName(doms[i]);
            }
        } else {
            removeName(doms);
        }

        function removeName(dom) {
            dom.className = dom.className.replace(name, '');
        }
    },
    //判断是否有
    hasClass:function(content,name){
        var doms = $$.$all(content);
        var flag =true;
        for(var i=0;i<doms.length;i++){
            flag = flag&&check(doms[i],name)
        }
        return flag;
        function check(element,name){
            return (""+element.className+"").indexOf(""+name+"")>-1;
        }
    },
    //获取
    getClass:function (id){
        var doms = $$.$all(id)
        return $$.trim(doms[0].className).split(" ")
    }











})
//内容框架
$$.extend($$,{
    html:function (content,value) {
        var doms = $$.$all(content);
        //设置内容
        if(value){
          for(var i = 0;i<doms.length;i++){
              doms[i].innerHTML = value;
          }
        } else{
           return doms[0].innerHTML

        }

    }
})
//封装DOM框架 -- 放在后面
$$.extend({
    //选择
    eq:function(){},
    first:function(){},
    last:function(){},
    //元素的插入和删除 克隆
    append:function(){},
    empty:function(){},
    remove:function(){},
    clone:function(){}
})
//封装json框架
$$.extend($$,{
    //将json转换成字符串
    sjson:function (json) {
        return JSON.stringify(json);
    },
    //将字符串转成json
    json:function (str) {
        return eval(str);
    }
})
//缓存框架-内存篇
$$.cache={
    data:[],
    get:function(key){
        var value = null;
        for(var i=0;i<this.data.length;i++){
            var item = this.data[i];
            if(key==item.key){
                value==item.value
            }
        }
        return value;
    },
    add:function(key,value){
        var json={key:key,value:value}
        this.data.push(json)
    },
    delete:function(key){
        var status = false
        for(var i=0;i<this.data.length;i++){
            var item = this.data[i]
            if(item.key.trim()==key){
                this.data[i].splice(i,1)  // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目 第一个参数：从index开始，第二个参数如：删除几个元素，包含第index个，第三个参数：代替值
                status==true;
                break;
            }
        }
    },
    update:function(key,valur){
        var status = false;
        // 循环数组元素
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            if (item.key.trim() === key.trim()) {
                item.value = value.trim();
                status = true;
                break;
            }
        }
        return status;
    },
    isExist:function(key){
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            if (key === item.key) {
                return true;
            }else{
                return false;
            }
        }
    }
}
//获取cookie值
$$.cookie={
    getCookie: function (name) {
        // 去除转义字符
        var name = name.escapeHTML(),
            // 读取文档中的所有cookie属性
            allCookies = document.cookie;

        // 下面是一些Cookie的数据格式信息（默认返回的是一个字符串）
        // H_PS_645EC=af88R0s3e76Ig1PlwkvrhnGGtg4qt5pcZNPKBUntPI2vGearAlyZyjXjmKYn%2BkggUXbNjhg;
        // 1. 查找名称为name的cookie信息script3&amp5;
        //name = name.substring(0, name.length-1);            //  当前步骤是为了去除掉末尾的分号(转换为标准形式);
        name += '=';
        // 等号右边的就是获取的数值，左边就是cookie的名称信息
        // 2. 获取'name='这个字符串在整个Cookie信息字符串中出现的位置下标
        var pos = allCookies.indexOf(name);
        // 3. 判断是否存在这个cookie的信息
        if (pos !== -1) {
            // 如果存在的话，就继续处理
            // 3. 计算'cookie='等号后面的位置
            var start = pos + name.length;
            // 3. 从'cookie='的位置开始向后搜索， 一直到;的位置结束, 从start的位置向后搜索信息
            var end = allCookies.indexOf(';', start);
            if (end === -1) {
                // 如果为-1的话， 说明cookie信息列表里面只有一个Cookie信息
                end = allCookies.length;
            }
            // 4. 提取Cookie的数值信息
            var value = allCookies.substring(start, end);
            // 5.处理之后反转义后返回(反转义的目的是将内容进行加密处理，防止攻击)【测试状态OK，由于之前的内部存储，必须先删除所有的，在执行就ok了】
            return value.unescapeHTML();
        } else {
            // 没有找到， 说明不存在这个cookie信息
            return '';
        }

        // 默认情况下返回一个空的字符串
        return '';
    },
    /**
     * 根据传入的参数信息设置浏览器的cookie
     * @param name
     * @param value
     * @param days
     * @param path
     */
    setCookie: function (name, value, days, path) {
        var name = name.escapeHTML(),
            value = value.escapeHTML(),
            expires = new Date(),
            _expires,
            res;

        //name = name.substring(0, name.length-1);            //  当前步骤是为了去除掉末尾的分号(转换为标准形式);

        // 设置cookie的过期时间(单位是毫秒)
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        if (path === '') {
            path = '';
        } else {
            path = (';path=' + path);
        }

        if (typeof expires === 'string') {
            _expires = '';
        } else {
            // 使用UTC标准时间
            _expires = (';expires=' + expires.toUTCString());
        }

        // 设置cookie信息，【注意要点：】(设置COokie的时候，只要遇到分号就会立即结束，只会保存分号之前的内容)
        res = name + '=' + value + _expires + path;
        // document.cookie="userId=828; userName=hulk";
        document.cookie = res;
    },
    /**
     * 根据名称信息和路径信息删除cookie
     * @param name
     * @param path
     */
    deleteCookie: function (name, path) {
        var name = name.escapeHTML(),
            expires = new Date();
        if (path === '') {
            path = '';
        } else {
            path = (';path=' + path);
        }

        // 删除之后重新设置cookie
        document.cookie = name + '=' + ';expires=' + expires.toUTCString() + path;
    },
    /**
     * 清空所有的cookie信息
     */
    clearAllCookies: function () {
        // 1. 获取浏览器中存储的所有cookie信息
        // "name&amp=xiuxiu&amp; name=xiuxiu; script=<script>alert(2); script2=<script>alert(2); script3=<script>alert(2); script3&amp=&ltscript&gtalert(2); script4&amp=&ltscript&gtalert(2); a&amp=&lta&gtalert(2)&lt/a&gt&amp"
        var cookies = document.cookie.split(';');
        if (cookies.length) {
            cookies.forEach(function (element) {
                // 拿到字符串：name&amp=xiuxiu&amp
                var index = element.indexOf('='),
                    name = element.substring(0, index);

                // 实现思路：要想删除某一个COOkie信息，只需要将cookie的name对应的值设置为空即可
                document.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            });
        }

    }

}
//本地框架存储
$$.store(function () {
    // 定义一个API，用于定义实现的本地存储的API接口
    var api = {},
        localStorageName = 'localStorage',
        globalStorageName = 'globalStorage',
        win = window,
        doc = window.document,
        storage;


    // 首先先定义要实现的功能接口
    api.set = function (key, value) {

    }
    api.get = function (key) {

    }
    api.remove = function (key) {

    }
    api.clear = function () {

    }


    /*
    *   a) sessionStorage和localStorage都是window的属性，也是Storage对象的实例，即：window.sessionStorage instanceof Storage返回True，window.localStorage instanceof Storage 返回True,也因此两者享有Storage的属性和方法。
        b) sessoinStorage存储的数据在页面会话结束时会被清空，页面会话在浏览器窗口关闭前持续存在，包含页面刷新和恢复。若新开标签或窗口将新建一个会话，再次获取sessionStorage将只限于当前会话，与先前会话的无关。localStorage存储的数据不会
        c) window.globalStorage自Gecko 13 (Firefox 13)起不再支持。
    *
    * */
    if (localStorageName in win && win[localStorageName]) {
        // 拿到本地存储的这个数据项
        storage = win[localStorageName];

        // 实现我自己定义的接口
        /**
         * 设置本地存储的内容
         * @param key
         * @param value
         */
        api.set = function (key, value) {
            storage.setItem(key, value);
        }
        /**
         * 获取本地存储的内容
         * @param key
         * @return {*}
         */
        api.get = function (key) {
            return storage.getItem(key);
        }
        /**
         * 移出其中的某一项
         * @param key
         */
        api.remove = function (key) {
            storage.removeItem(key);
        }
        /**
         * 清空本地存储的所有内容
         */
        api.clear = function () {
            storage.clear();
        }
    } else if (globalStorageName in win && win[globalStorageName]) {
        // HTML5中的localStorage替换了原来的globalStorgae
        // 1. 拿到本地存储的对象(这是一个Json对象)[Firefox浏览器]
        storage = win[globalStorageName][win.location.hostname];
        api.set = function (key, value) {
            storage[key] = value;
        }
        api.get = function (key) {
            return storage[key] && storage[key].value;
        }
        api.remove = function (key) {
            // delete用来删除一个对象的属性。
            delete storage[key];
        }
        api.clear = function () {
            for (var key in storage) {
                delete storage[key];
            }
        }
    } else if (doc.documentElement.addBehavior) {
        // 如果可以给一个对象添加行为的话
        //  单独定义一个获取本地存储的对象storage
        function getStorage() {
            // 如果已经获取到了Storage对象的话
            if (storage) {
                return storage;
            }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // userData 64KB IE专用
            storage.addBehavior('#default#userData');
            // 这个是微软自定义的一个本地存储，相比之下有更大的容量
            storage.load(localStorageName);
            return storage;
        }

        api.set = function (key, value) {
            var storage = getStorage();
            // 设置属性
            storage.setAttribute(key, value);
            // 保存属性信息
            storage.save(localStorageName);
        }
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        }
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            // 移出数据之后记得保存一下数据
            storage.save(localStorageName);
        }
        api.clear = function () {
            // 1. 获取Storage对象
            var storage = getStorage();
            // 2.获取storage对象存储的所有属性信息
            var attributes = storage.XmlDocument.documentElement.attributes;
            storage.load(localStorageName);
            // 3. 遍历所有的属性信息，并从本地移出数据
            [].slice.call(attributes).forEach(function (element) {
                storage.removeAttribute(element.name);
            })
            // 4. 移出完毕之后，开始保存信息到本地存储
            storage.save(localStorageName);
        }

        return api;
    }


})

















