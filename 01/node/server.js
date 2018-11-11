/*
 * @Author: iceStone
 * @Date:   2016-01-25 19:01:51
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 01:05:52
 */

'use strict';

var http = require('http');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(request, response) {
  // var u = url.parse(request.url);
  // console.log(u);
  // var u1 = url.parse(request.url, true);
  // console.log(u1);
  // response.writeHead(200, {
  //   'Content-Type': 'text/plain'
  // });
  // response.end('<h1>hello world');
  // console.log(request.method);
  // if (request.method == 'POST') {
  //   var postData = '';
  //   request.on('data', function(p) {
  //     postData += p;
  //   });
  //   request.on('end', function() {
  //     response.end(JSON.stringify(require('querystring').parse(postData)));
  //   });
  // } else {
  //   response.end('<h1>hello world');
  // }
  var path = url.parse(request.url);
  switch (path.pathname) {
    case '/signin':
      signin(request, response);
      break;
    case '/post':
      post(request, response);
      break;
  }
}).listen(2000);

var signinHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登陆</title></head><body><form action="/post" method="post"><table border="1"><tr><td>用户名</td><td><input type="text" name="username"></td></tr><tr><td>密码</td><td><input type="password" name="password"></td></tr><tr><td></td><td><input type="submit"></td></tr></table></form></body></html>';

function signin(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(signinHtml);
}

function post(req, res) {
  var postData = '';
  req.on('data', function(part) {
    postData += part;
  });
  req.on('end', function() {
    var info = querystring.parse(postData);
    if (info.username === 'admin' && info.password === '123') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end('<h1>登陆成功</h1>');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(signinHtml);
    }
  });

}
