<?php
include("config.php");

$id=$_POST["id"];

$result = mysqli_query($con ,"select img from users where id=$id");
$row = mysqli_fetch_assoc($result);
unlink("../".$row["img"]);

$img_name=$_FILES["img"]["name"];
move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name");
// step 1

$resp["status"] = mysqli_query($con , "update users set img='uploads/$img_name' where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4



?>