<?php
   include("public.php");
   $conn = getConn("happygo");
   $uname = $_GET["uname"];
   $registerSql = "select * from users";
   $registerResult = mysqli_query($conn,$registerSql);
   
   
   
   $flag = true;
   while($registerArr = mysqli_fetch_array($registerResult)){
   	if($uname == $registerArr["uname"]){
   		$flag = false;
   		break;
   	}
   }
   if($flag){
   	echo 2;//注册成功  
   }else{
   	echo 1;
   }
   
   /*$flag = true;
   while($registerArr = mysqli_fetch_array($registerResult)){
   	if($uname == $registerArr["uname"]){
   		$flag = false;
   		break;
   	}
   }
   if($flag){
   	$sql = "insert into users(uname,pwd) values( '$uname','$pwd')";
   	$result = mysqli_query($conn,$sql);
   		if($result){
   			echo 2;//注册成功
	   	}else{
	   		echo 1;//用户名存在
	   }
   }
  */
?>