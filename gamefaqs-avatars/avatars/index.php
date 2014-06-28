<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	
	<link rel='stylesheet' type='text/css' href='../css/ga-main.css'>
	
	<title>GameFAQs Avatars - Avatar Database</title>
</head>

<!-- 
		GameFAQs Avatars By Judgmenl
		Avatar Database
		Created: 22 May 2014	 
		Tries to conform with CSS3/HTML5 Standards
 -->
 
<?php
	$avatar_count = count(glob("/usr/cs/2014/rdupuis/public_html/gamefaqs-avatars/avatars/*.png"));
?>
 
<body>
	<div class='title-container'>
		<span class='title'>GameFAQs Avatars</span>
		<div class='nav-bar'><a href='/~rdupuis/gamefaqs-avatars/'>Home</a><a href='https://greasyfork.org/scripts/628-gamefaqs-avatars' target='_blank' >Install</a><a href='/~rdupuis/gamefaqs-avatars/gamefaqs-avatars.user.js' target='_blank'>Mirror</a><a href='/~rdupuis/gamefaqs-avatars/changelog.txt' target='_blank'>Changelog</a><a href='/~rdupuis/gamefaqs-avatars/avatars/'>Avatar Database</a> <span class='avatar-count'><?php echo "$avatar_count Avatars"; ?></span></div>
	</div>
	<div>		
		<div id='avatar-db'>
			<?php
			
				if ($_GET['start']) {
					$start = $_GET['start'];
				} else {
					$start = 0;
				}
				
				$i = -1;
				$filearr = glob("*.png");
				$size = count($filearr);
			
			
				if ($_GET['end']) {
					$end = $_GET['end'];
				} else {
					$end = 25;
				}
				
				if( $end > $size ) {
					$end = $size;
				}
				
				echo "<div class='avatar-row'>";
				
				for($i = $start; $i < $end; $i++) {

					$filename = $filearr[$i];
					$name = substr($filename, 0, -4);
					$url = str_replace(' ', '_', $name);

					if( $i == $start ) {
						echo "<div class='avatar-container'><img class='avatar' src='$filename' alt='$name'><div><a href='http://www.gamefaqs.com/users/$url/boards' target='_blank'>$name</a></div></div>";
					} else if( ($i % 5) == 0 ) {
						echo "</div><div class='avatar-row'>";
						echo "<div class='avatar-container'><img class='avatar' src='$filename' alt='$name'><div><a href='http://www.gamefaqs.com/users/$url/boards' target='_blank'>$name</a></div></div>";
					} else {
						echo "<div class='avatar-container'><img class='avatar' src='$filename' alt='$name'><div><a href='http://www.gamefaqs.com/users/$url/boards' target='_blank'>$name</a></div></div>";
					}
				}
				
				echo "</div>";
				
					$pages = $size / 25;
				
				echo "Page:";
				
				$n_start = -25;
				
				for( $i = 0; $i < $pages; $i++ ) {
					$n_start = $n_start + 25;
					$n_end = $n_start + 25;
					echo " <a href='index.php?start=$n_start&amp;end=$n_end'>$i</a> ";
				}
			
			?>
		</div>
	</div>
	</body>
</html>