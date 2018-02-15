<?php

if (isset($_POST["mobile"]))
{
$file=$_FILES["fileToUpload-mobile"];
}
else
$file=$_FILES["fileToUpload"];

if (isset($file))
{
$target_dir = "uploads/permit-photo/";

$directoryName =  date("Y-m-d");
//Check if the directory already exists.

if(!is_dir($target_dir.'/'.$directoryName))
{
    //Directory does not exist, so lets create it.
    mkdir($target_dir.'/'.$directoryName, 0755);
}

$target_dir=$target_dir.'/'.$directoryName.'/';

  $target_file = $target_dir.basename($file["name"]);
  $uploadOk = 1;

  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if (file_exists($target_file))
	{
		$i= 1;
		
		while (file_exists($target_file))
		{
			// get file extension
			$extension = pathinfo($target_file, PATHINFO_EXTENSION);
			
			// get file's name
			$filename = pathinfo($target_file, PATHINFO_FILENAME);
			
			// add and combine the filename, iterator, extension
      
       $name=explode("-",$filename);
       
			$new_filename = $target_dir.  $name[0] . '-' . $i . '.' . $extension;
      
			// add file name to the end of the path to place it in the new directory; the while loop will check it again
			$target_file =  $new_filename;
			$i++;
			
		}
	}


if(isset($_POST["submit"])) {
    $check = getimagesize($file["tmp_name"]);
    if($check !== false) {
        echo  $check["mime"] ;
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check file size
if ($file["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
      header('Location:validity.html?'.$_POST['id_number'].'?'.$_POST['id_prior_approval'].'?'.$_POST['pass_img'].'?'.$target_file);
        
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
}

 header('Location:validity.html?'.$_POST['id_number'].'?'.$_POST['id_prior_approval'].'?'.$_POST['pass_img']);
?>