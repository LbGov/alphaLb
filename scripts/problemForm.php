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
$tablename="problem_table";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$doingAction=$_POST['doingAction'];
$wrongAction=$_POST['wrongAction'];
$URL = $_POST['Referer'];
$submitButton=$_POST['action_doProcessProblem'];


$insertQuery = "INSERT INTO problem_table
          (doing_what, what_went_wrong,url)
          VALUES
          ('".$doingAction."', '".$wrongAction."', '".$URL."')";
                          
if ($conn->query($insertQuery) === TRUE) {
	if($submitButton == "Submit"){
	header( 'Location: http://portal.gov.lb/about/thank-you-problem/index.html' );
	}
	else{
	header( 'Location: http://portal.gov.lb/about/thank-you-problem/index_ar.html' );
	}
} else {
}

?>

</body>
</html>