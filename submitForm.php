<!DOCTYPE html>
<html>
<head>
<meta name="generator" content=
"HTML Tidy for HTML5 for Windows version 5.2.0">
<title></title>
</head>


<body>

<?php
$servername = "127.0.0.1:3306";
$username = "root";
$password = "dg@2017";
$dbname = "feedback";
$tablename="feedback_table";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$fname=($_POST['fname']);
$lname=($_POST['lname']);
$email=($_POST['email']);
$comment=($_POST['comment']);
$country=($_POST['country']);

$insertQuery="INSERT INTO ".$tablename." VALUES
	(0,'".$fname."','".$lname."','".$email."','".$comment."','".$country."')";
                
           
if ($conn->query($insertQuery) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


?>

</body>
</html>