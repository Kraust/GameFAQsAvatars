<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	
	<link rel='stylesheet' type='text/css' href='css/ga-main.css'>
	
	<title>GameFAQs Avatars</title>
</head>

<!-- 
		GameFAQs Avatars By Judgmenl
		Index
		Created: 22 May 2014	 
		Tries to conform with CSS3/HTML5 Standards
 -->

<?php
	$avatar_count = count(glob("/usr/cs/2014/rdupuis/public_html/gamefaqs-avatars/avatars/*.png"));
?>
 
<body>
	<div class='title-container'>
		<span class='title'>GameFAQs Avatars</span>
		<div class='nav-bar'><a href='/~rdupuis/gamefaqs-avatars/'>Home</a><a href='https://greasyfork.org/scripts/628-gamefaqs-avatars' target='_blank' >Install</a><a href='gamefaqs-avatars.user.js' target='_blank'>Mirror</a><a href='changelog.txt' target='_blank'>Changelog</a><a href='/~rdupuis/gamefaqs-avatars/avatars/'>Avatar Database</a> <span class='avatar-count'><?php echo "$avatar_count Avatars"; ?></span></div>
	</div>
	<div>
		<p>This is the home of GameFAQs Avatars a UserScript created by <a href='http://www.gamefaqs.com/users/Judgmenl/boards' target='_blank'>Judgmenl</a>.</p>
		<p>GameFAQs Avatars allows for users on the GameFAQs forums to upload and view other members avatars.
			Avatars are little images that are displayed alongside your posts. They are a visual representation of
			who you are on the GameFAQs forums.
		</p>
		
		<p>To use, you need to have a UserScript plugin like <a href='https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/' target='_blank'>Greasefire</a> (Firefox) or <a href='https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en' target='_blank'>Tampermonkey</a> (Chrome/Android) installed.</p>
		<p>Current Version: 2.5.4</p> <!-- Make this Dynamic -->
	</div>
	</body>
</html>