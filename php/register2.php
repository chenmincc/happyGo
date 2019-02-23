<?php
	include("public.php");
   $conn = getConn("happygo");
   $uname = $_GET["uname"];
   $pwd = $_GET["pwd"];
   
  $sql = "insert into users(uname,pwd) values( '$uname','$pwd')";
  $result = mysqli_query($conn,$sql);
  $registerArr = mysqli_fetch_array($result);
  
	if($registerArr){
		echo 3;//插入成功
	}else{
		echo 4;//插入失败
		   }
   
   	
?>