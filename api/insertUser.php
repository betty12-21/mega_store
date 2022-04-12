<?php
include("config.php");

$name = $_POST["name"];
$user = $_POST["user"];
$pass = $_POST["pass"];

$img_name = $_FILES["img"]["name"];
move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name");
// step 1

$resp["status"] = mysqli_query($con, "insert into users(name,user,pass,img) values('$name','$user','$pass','uploads/$img_name')"); // step 2 & 3
 // {"status":true}
echo json_encode($resp); // step 4

?>