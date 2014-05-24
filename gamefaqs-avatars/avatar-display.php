<?php
 foreach(glob('avatars/*.*') as $filename){
     echo "<img src='$filename'></img>";
	 echo "<br>";
 }
?>