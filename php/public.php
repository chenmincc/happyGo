<?php
	header("Content-Type:text/html;charset=utf-8");
	
	function getConn($dbName){
		$conn = mysqli_connect("localhost","root","",$dbName);
		mysqli_query($conn,"set names utf8");
		return $conn;
	}
	

?>