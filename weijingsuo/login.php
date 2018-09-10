<?php
include("connect.php");
$userId=$_POST["userId"];
$pass=$_POST["pass"];
session_start();
$username=null;
$password=null;
$result=mysqli_query($con,"select * from register_tal where username='{$userId}'");
if(!$result){
	printf("Error:%s\n",mysqli_query($con));
	exit();
}
 while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)){
 	$username=$row["username"];
 	$password=$row["password"];
 }
 if(!is_null($username)){
 	echo'账户已存在';
 }
else if($pass!=$password){
	echo'密码错误';
}




?>