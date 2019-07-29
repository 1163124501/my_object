<?php
    header("Content-Type:text/html;charset=utf8"); 
	header("Access-Control-Allow-Origin: *"); //解决跨域
	header('Access-Control-Allow-Methods:POST');// 响应类型  
	header('Access-Control-Allow-Headers:*'); // 响应头设置 
    $link=mysql_connect("localhost","root","root"); 
    mysql_select_db("showimg", $link); //选择数据库
    mysql_query("SET NAMES utf8");//解决中文乱码问题
	
    $id = $_POST['id'];
    $zan = $_POST['zan'];
    $user = $_POST['user'];
    $sql = $_POST['sql'];
    
	//插入数据到数据库 
	//$strsql = "insert into list (id,img,name,zan_tis,mwidth,mheight) 
	//values('$id','$img','$name','$zan_tis','$width','$height')";
	
	//修改数据库
	mysql_query("UPDATE list".$sql." SET zan = '$zan'
			WHERE id = '$id'");
	mysql_query("UPDATE list".$sql." SET user = '$user'
			WHERE id = '$id'");
	$result = @mysql_query($strsql);  //函数执行一条 MySQL 查询。SELECT，SHOW，EXPLAIN 或 DESCRIBE 都需要用这个函数执行

	print_r($result)
	
?>