<?php
$servername="localhost";
$username="root";
$password="123123";
$dbname = "mydb";
//创建连接
$con= mysqli_connect($servername,$username,$password,$dbname);	
//检测连接 
if(!$con){
	die("数据库连接失败:". $con->connect_error);
}
// echo '连接成功<br />';
// $sql="CREATE TABLE register_tal(
//         username   VARCHAR(100) NOT NULL PRIMARY KEY, 
//         password   VARCHAR(100) NOT NULL
//         )";

// 	if (mysqli_query($con, $sql)) {            
//          echo "数据表 register_tal 创建成功";
//         } else {
//          echo "创建数据表错误: " . mysqli_error($con);
//         }

// mysqli_close($con);//关闭数据库

header("Content-Type: text/html; charset=utf-8");

?>