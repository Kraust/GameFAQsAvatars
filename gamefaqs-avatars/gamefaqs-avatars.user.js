// ==UserScript==
// @name        GameFAQs-Avatars
// @Author		Judgmenl
// @namespace   Kraust
// @description Avatars for GameFAQs
// @include     *.gamefaqs.com/*
// @version     2.5.4
// @grant       none
// ==/UserScript==

/****************************************************************************
 * Disclaimer: This product is given as is, and anyone who many want to use *
 * It is free to with my permission. If you need to contact me for any      *
 * reason please send me a message over on GameFAQs. I've tried to make it  *
 * so that in later versions of the script that people with a jQuery        *
 * background can understand what's going on here.                          *
 ****************************************************************************/
 
/****************************************************************************
 * As of 2.5.4 I'm working on re-writing a lot of this code                 *
 * due to a lot of suggestions on Blood Money.								*
 * Thanks to OTACON120, P4wn4g3, and Corrupt_Power 							*
 ****************************************************************************/
 
// storage stuff
if(typeof(Storage)!=="undefined") {
	var storage = localStorage.getItem("avatar");
} else {
	var storage = "left";
}


// we need jQuery for this.
if(jQuery) {

	// link to avatar settings. This goes on every page.
	$(".masthead_user").prepend("<a href='/boards/user.php?upload=1'>Avatar Settings <i class='icon icon-picture'></i></a> ");

	
	if((decodeURIComponent((new RegExp('[?|&]' + "upload" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) == "1") && (location.pathname == "/boards/user.php")) {
	
	
		// This block is for http://www.gamefaqs.com/boards/user.php?upload=1 Note the upload=1.
		
		var user = $("html.js body.wf-active div.wrapper div#mantle_skin div#content.container div.main_content div.span8 div.body table.board tbody tr td").eq(0).text();
		
		// GameWeasel Fix
		if( user == "") {
			var user = $("#content > div > div > div.body > table > tbody > tr:nth-child(1) > td").text();
		}
		console.log(user);
		
		
		var upload_user = user + " ";

		$(".page-title").html("GameFAQs Avatars");
		$(".userinfo").css("border", "none");
		
		// Preparing for the Upload UI
		$("tbody").empty();    
			
		// Renders the Upload UI	
		if( user ) {
			$("tbody").append("<div style='float:left; width:100px; height:100px;'><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + user + ".png' alt='' ></div>" );
			$("tbody").append("<div style='float:left; padding-left:10px'><h4>Global Avatar Settings</h4> <ul id=settings class='paginate user' style='margin:0;padding:0;'> \
					<li><a href='' id='av_left'>Avatars to the Left</a></li><li><a href='' id='av_right'>Avatars to the Right</a></li><li><a href='' id='av_no'>No Avatars</a></li></ul> \
					<form id='submit' method='POST' enctype='multipart/form-data' > \
					<input class='btn' type='file' name='file' accept='image/*' id='file'> \
					<input class='btn btn_primary' type='button' id='submit_btn' value='Upload'> \
					<input style='display:none' type='text' name='dest' value='GameFAQs-Avatars'> \
					<input style='display:none' type='text' name='user' value='" + upload_user + "'> \
					<span id='server_message'>Maximum File Size: 100KB</span> \
					</form></div>");
				
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'>Before uploading an avatar, you must change your Signature to upload:ok (<a href='http://puu.sh/9yTZJ/3acde356e0.png' target='_blank'>Example</a>). \
								You can do that on <a href='http://www.gamefaqs.com/boards/sigquote.php' target='_blank'>this</a> page. You can change your signature back after the avatar is uploaded.");
			

			// Update Notes are down here.
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'><h4>Version 2.5.4</h4>+ Refactored a lot of code due to user Input<br> + New Design for people who use avatars to the left and message post display above.</div>");

			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'><a href='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/' target='_blank'>GameFAQs Avatars</a> created by <a href='http://www.gamefaqs.com/users/Judgmenl/boards'>Judgmenl</a> - 2014.</div>");
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:0px;'>A listing of avatars can be located <a href='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/' target='_blank'>here</a>.</div>");

		}
		
		
		/* error checking when handling the upload */	

		$("#file").change(function() {
		
			var file = this.files[0];
			var size = file.size;
			var type = file.type;
			
			if( !type.match(/image.*/) ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Invalid File Type");
				return;		
			}
			
			if( size > 102400 ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Image is too big (" + size/1024 + "KB). 100KB maximum.");
				return;
			}
			
			if( !user ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Log in to upload avatars.");
			}
			
			$("#submit_btn").css("display", "inline");
			$("#server_message").html("OK");
		
			

		});
		
		/* ajax request to handle the upload */

		$("#submit_btn").click( function() {
		
		
		
			var formData = new FormData($('#submit')[0]);
		
			$("#server_message").html("Uploading...");
		
			$.ajax( {
				url: "http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/upload-v2.php",
				dataType: "html",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false
			}).done(function( data ) {
				$("#server_message").html(data);
				if( data == 'Upload Successful! Refreshing to apply changes...') {
					location.reload(true);
				}
			});
			
		});
		
		
		/* storage setters */
		$("#av_left").click( function() {
			localStorage.setItem("avatar", "left");
		});
		
		$("#av_right").click( function() {
			localStorage.setItem("avatar", "right");
		});
		
		$("#av_no").click( function() {
			localStorage.setItem("avatar", "no");
		});


	} else 	if((window.location.pathname.indexOf("\/users\/") > -1) && window.location.pathname.indexOf("\/boards") > -1) {	
	
		// This block is for http://www.gamefaqs.com/users/<username>/boards
		// It handles the avatars in profiles code.

		var userName = $("#content > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text();

		$(".span4 > .body").prepend(" \
			<div class='pod'> \
				<div class='head'><h2 class='title'>" + userName + "'s Avatar</h2></div> \
					<div class='body'> \
						<div class='details'> \
							<img src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + userName + ".png' alt=''> \
						</div> \
					</div> \
				<div class='foot'></div> \
			</div>");
			
		$('img').error(function() {
			$(this).remove(); 
		});
		
	} else {
	
		// This is what renders the avatars on a post by post basis.
				
		var msgCount = $("td.msg").length;

		if ( storage == "no" ) {
			// no avatars.					
		} else if (storage == "right" ) {

			// Avatars displayed on the right.
		
			for( var i = 0; i < msgCount; i++) {
				$("table.board").eq(i).css("position", "relative");
				$("td.msg").eq(i).prepend("<div style=\"position:absolute; right:8px;\"><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + 
													$(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' style='max-width:100px; max-height:100px;'></div>" );
				$(".msg_body").eq(i).css("padding-right", "110px");
				$(".msg_body").eq(i).css("min-height", "100px");

			}

			$('img').error(function() {
				$(this).parent().next().css("padding-right", "0px");
				$(this).parent().next().css("min-height", "0px");		
				$(this).remove(); 
			});

		} else {

			// This handles both the left and default cases.
			// I can refactor code too.
		
			if($('span.author_data:nth-child(2)').length != 0) {
				for( var i = 0; i < msgCount; i++) {
					$('span.author_data:nth-child(2)').eq(i).after("<img src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + 
													$(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' style='max-width:100px; max-height:100px;'>" );
				}
			} else {
			
				/* Please note this part is for users who have Message Poster Display "Above Message" */
				
				for( var i = 0; i < msgCount; i++) {
					$(".top .author").eq(i).attr("colspan", "2");
					$("tr.topmsg").eq(i).prepend("<td class='author'><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + 
													$(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' style='max-width:100px; max-height:100px;'></td>" );
					$(".msg_body").eq(i).css("min-height", "100px");
					
				$('img').error(function() {
					$(this).parent().next().css("min-height", "0px");		
					$(this).remove(); 
				});

				}
			}

			$('img').error(function() {
				$(this).remove(); 
			});	
			
		}
			
	}

} else {
	alert("GameFAQs Avatars requires jQuery to be present. It should be prsent by default. Make sure you're not blocking it with a third party addon like NoScript.");
}
