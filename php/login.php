<?php
	include("public.php");
    $conn = getConn("happygo");
    $uname = $_GET["uname"];
    $pwd = $_GET["pwd"];
    
//  echo "$uname";
//  echo "$pwd";
  $loginSql = "select * from users";
  
	$loginResult = mysqli_query($conn,$loginSql); 
	$flag = true;
	while($loginArr = mysqli_fetch_array($loginResult)){
		if($uname == $loginArr["uname"]){
			$flag = false;
			if($pwd == $loginArr["pwd"]){
	//				echo "<script>alert('登录成功');location.href='../index.html';</script>";
					echo $uname;
				}else{
	//				echo "<script>alert('密码错误，请重新登录');location.href='../login.html';</script>";
					echo 4;
				}
				break;
		}	
	}
	
	if($flag){
//		echo "<script>alert('用户名不存在，请重新登录');location.href='../login.html';</script>";
		echo 5;
	}
?>