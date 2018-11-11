<?php
include("connect.php");
 session_start();
 $userId=$_POST["userId"];
 $pass=$_POST["pass"];

 $hash=password_hash($pass, PASSWORD_DEFAULT);
  // echo "password:".$hash.'<br />';

  
  $dbusername=null;
  $dbpassword=null;
  $result=mysqli_query($con,"select * from register_tal where username='{$userId}';");//查出对应用户名的信息，isdelete=1表示在数据库已被删除的内容

   // return  mysqli_fetch_array($result);//类mysqli_result的对象无法转换为字符串,改一下返回值的类型用mysqli_fetch_array()函数以数组的形式返回
  //如果查询失败，报错位置

  if (!$result) {
 printf("Error: %s\n", mysqli_error($con));
 exit();
}
 
 // echo "result:".$result;
 
  while ($row=mysqli_fetch_array($result,MYSQLI_ASSOC)) {
  	$dbusername = $row["username"];
  	$dbpassword = $row["password"];
 
  }
 
  // 判断是否已有同名用户名
    if(!is_null($dbusername)){  //不是空值
    ?>    
    	用户已存在


<?php
} 
  mysqli_query($con,"INSERT INTO register_tal ( username, password)
  VALUES ( '{$userId}', '{$hash}')") 

    or die("存入数据库失败".mysql_error()) ; 
   
mysql_close($con); 
echo '注册成功'
?>


