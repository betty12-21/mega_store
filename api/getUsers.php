<?php

include("config.php");


$result = mysqli_query($con, "select * from users"); // step 1
$data = mysqli_fetch_all($result,MYSQLI_ASSOC); // step 2

echo json_encode($data); // step 3

?>