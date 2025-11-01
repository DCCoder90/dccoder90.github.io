---
share: true
title: "Uploading Files"
date: "2011-09-30"
categories: 
  - "posts-from-old-site"
  - "tutorials"
tags: 
  - "php"
  - "tutorial"
---

PHP as you all know is a very powerful and yet fairly loose language, however one of it's very usefully abilities is the ability to upload files. PHP can upload literally any type of file you allow it to. However this can also open up many holes for many exploits, which is why we'll also cover some basic security along with uploading the files.

 

PHP as you all know is a very powerful and yet fairly loose language, however one of it's very usefully abilities is the ability to upload files. PHP can upload literally any type of file you allow it to. However this can also open up many holes for many exploits, which is why we'll also cover some basic security along with uploading the files.

Where shall we start? How about at the very beginning, how are you going to upload files without a form to upload them from? First I'll show you an example: ```html
<form enctype="multipart/form-data" action="upload.php" method="post">

<input type="hidden" name="MAX_FILE_SIZE" value="250000">

Choose a file to upload: <input name="uploadedfile" type="file"><br><br />

<input type="submit" name="submitfile" value="Upload File"><br />

</form><br />
``` Now, I'm assuming you have basic knowledge of HTML, however one of the parts of this you may not have yet seen is:

enctype="multipart/form-data"

This part, although rather large and seemingly unnecessary, is required to upload files as it tells the server that we are sending data which is more then text. Also the "MAX\_FILE\_SIZE" field is also useful as it defines the maximum size of the file to be uploaded. Now that we have our form ready we have to start on the muscle of our little program, for this we'll create a blank file and save it as "upload.php".

Now for another example...yayyy!!!

Except this time all the explanations are in the source code ;) ```php

$target_path = "uploads/"; //This is the path where you want all the uploaded files to be stored.

if(isset($_POST['submitfile']))

{ //Ok now we have to check to see if they submitted the form

$file_name=basename($_FILES['uploadedfile']['name']); //This will use the base name() function to get the actuall file name of the uploaded file.

$mime = $_FILES['uploadedfile']['type']; //This will give us the mime (Multipurpose Internet Mail Extension) of the file, so we can determine if we want to allow it or not.

$target = $target_path .$file_name; //This will give us the actual address and filename to put the file.

if ($mime == "image/jpeg"{ //Is the file a .jpeg image file? If not then we&rsquo;ll just throw it away, but if it is we are going to save it and tell the user it has been uploaded.

if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target)) { //The move_uploaded_file function does exactly what it says, it moves the uploaded file, however we&rsquo;ve put it into and if statement and if it succeeds it prints the following message, and if it fails it prints an error.

echo "The file ". $file_name. " has been uploaded";

} else{

echo "There was an error uploading the file, please try again!";

}

}else{

echo "The file type was invalid!";

}
``` Well that pretty much concludes it, I know this is a crappy tutorial but it get’s the job done and explains the basics (remember I said basics) of file uploading and the basics (basics) of the security to you. Just remember you really need to guard the files you upload, for example what if someone managed to upload a PHP script that deleted all the files in your directory? Well then they could just as easily access it from the browser and delete them….where would you be then?

See some of the reference links for a little more info on this topic, especially the MIME reference link, it’ll really help ya out in the long run.
