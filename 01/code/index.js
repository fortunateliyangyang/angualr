/*
 * @Author: iceStone
 * @Date:   2016-01-26 14:41:53
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 15:12:32
 */

'use strict';
// 可以用来创建一个HTTP服务器
var http = require('http');

// 创建一个服务
var server = http.createServer(function(request, response) {
  // // 只要有人来了就会执行此函数
  // console.log(request.url);
  // // 处理请求和响应
  // response.writeHead(200, {
  //   'Content-Type': 'text/html', // 告诉客户端我给你的是HTML
  //   'key1': 'value1'
  // });
  // // 往响应体中放数据（只能是字符串）
  // response.write('<h1>HAHAHA</h1>');
  // response.end(); // 结束了回去吧
});
// 启动服务
server.listen(8080, function(error) {
  console.log('成功监听8080端口');
});
