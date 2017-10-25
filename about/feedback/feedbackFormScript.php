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

$whyContactingUs=$_POST['WhyContactingUs'];
$whyReason=$_POST['WhyReason'];
$sectionId=$_POST['SpecificSectionID'];
$specificPage=$_POST['SpecificPage'];

$detailMessage=$_POST['DetailMessage'];
$name=$_POST['YourName'];
$email=$_POST['YourEmail'];

$submitButton=$_POST['action_doProcessFeedback'];


$insertQuery = "INSERT INTO feedback_table
          (whyContactingUs, whyReason, sectionId,specificPage,detailMessage,name,email)
          VALUES
          ('".$whyContactingUs."', '".$whyReason."', '".$sectionId."', '".$specificPage."', '".$detailMessage."', '".$name."', '".$email."')";
                          
if ($conn->query($insertQuery) === TRUE) {
	if($submitButton == "Submit"){
	header( 'Location: http://portal.gov.lb/dg/browse/thank-you/index.html' );
	}
	else{
	header( 'Location: http://portal.gov.lb/dg/browse/thank-you/index_ar.html' );
	}
} else {
}

?>

</body>
</html>