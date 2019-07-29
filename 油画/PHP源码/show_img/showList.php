<?php
    header("Content-Type:text/html;charset=utf8"); 
	header("Access-Control-Allow-Origin: *"); //解决跨域
	header('Access-Control-Allow-Methods:POST');// 响应类型  
	header('Access-Control-Allow-Headers:*'); // 响应头设置 
    $link=mysql_connect("localhost","root","root"); 
    mysql_select_db("showimg", $link); //选择数据库
    mysql_query("SET NAMES utf8");//解决中文乱码问题

    $sql = $_POST['sql'];
	if($sql==2){
		$q= "SELECT * FROM list2";
		$rs = mysql_query($q); //获取数据集
		if(!$rs){die("数据库没有数据!");}
		//循环读取数据并存入数组对象
		$dlogs;$i=0;$dlog;
		while($row=mysql_fetch_array($rs))
		{
			$result = @mysql_query($strsql);
					$dlog['id']= $row["id"];
					$dlog['img']= $row["img"];
					$dlog['name']= $row["name"];
					$dlog['zan_tis']= $row["zan_tis"];
					$dlog['zan']= $row["zan"];
					$dlog['user']= $row["user"];
					$dlog['width']= $row["mwidth"];
					$dlog['height']= $row["mheight"];
					$dlogs[$i++]=$dlog;
		}
		
		echo urldecode(json_encode($dlogs));
	}else if($sql==3){
		$q= "SELECT * FROM list3";
		$rs = mysql_query($q); //获取数据集
		if(!$rs){die("数据库没有数据!");}
		//循环读取数据并存入数组对象
		$dlogs;$i=0;$dlog;
		while($row=mysql_fetch_array($rs))
		{
			$result = @mysql_query($strsql);
					$dlog['id']= $row["id"];
					$dlog['img']= $row["img"];
					$dlog['name']= $row["name"];
					$dlog['zan_tis']= $row["zan_tis"];
					$dlog['zan']= $row["zan"];
					$dlog['user']= $row["user"];
					$dlog['width']= $row["mwidth"];
					$dlog['height']= $row["mheight"];
					$dlogs[$i++]=$dlog;
		}
		
		echo urldecode(json_encode($dlogs));
	}else if($sql==4){
		$q= "SELECT * FROM list4";
		$rs = mysql_query($q); //获取数据集
		if(!$rs){die("数据库没有数据!");}
		//循环读取数据并存入数组对象
		$dlogs;$i=0;$dlog;
		while($row=mysql_fetch_array($rs))
		{
			$result = @mysql_query($strsql);
					$dlog['id']= $row["id"];
					$dlog['img']= $row["img"];
					$dlog['name']= $row["name"];
					$dlog['zan_tis']= $row["zan_tis"];
					$dlog['zan']= $row["zan"];
					$dlog['user']= $row["user"];
					$dlog['width']= $row["mwidth"];
					$dlog['height']= $row["mheight"];
					$dlogs[$i++]=$dlog;
		}
		
		echo urldecode(json_encode($dlogs));
	}else if($sql==5){
		$q= "SELECT * FROM list5";
		$rs = mysql_query($q); //获取数据集
		if(!$rs){die("数据库没有数据!");}
		//循环读取数据并存入数组对象
		$dlogs;$i=0;$dlog;
		while($row=mysql_fetch_array($rs))
		{
			$result = @mysql_query($strsql);
					$dlog['id']= $row["id"];
					$dlog['img']= $row["img"];
					$dlog['name']= $row["name"];
					$dlog['zan_tis']= $row["zan_tis"];
					$dlog['zan']= $row["zan"];
					$dlog['user']= $row["user"];
					$dlog['width']= $row["mwidth"];
					$dlog['height']= $row["mheight"];
					$dlogs[$i++]=$dlog;
		}
		
		echo urldecode(json_encode($dlogs));
	}else{
		$q= "SELECT * FROM list";
		$rs = mysql_query($q); //获取数据集
		if(!$rs){die("数据库没有数据!");}
		//循环读取数据并存入数组对象
		$dlogs;$i=0;$dlog;
		while($row=mysql_fetch_array($rs))
		{
			$result = @mysql_query($strsql);
					$dlog['id']= $row["id"];
					$dlog['img']= $row["img"];
					$dlog['name']= $row["name"];
					$dlog['zan_tis']= $row["zan_tis"];
					$dlog['zan']= $row["zan"];
					$dlog['user']= $row["user"];
					$dlog['width']= $row["mwidth"];
					$dlog['height']= $row["mheight"];
					$dlogs[$i++]=$dlog;
		}
		
		echo urldecode(json_encode($dlogs));
	}
?>