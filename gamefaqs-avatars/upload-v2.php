<?php
	//require '../../parameters.php';
	require 'simple_html_dom.php';
	header("Access-Control-Allow-Origin: http://www.gamefaqs.com ");

	if ($_POST) {
	
		// Personal Note: DropboxUploader.php is not mine, and this would not be possible without the example
		// code at [http://jaka.kubje.org/].
		//require 'DropboxUploader.php';
	
		try {		
	
			//throw new Exception('Uploading is currently down for maintinence.');

			$user = str_replace(" ", "+", substr($_POST['user'], 0, -1));
			
			$html = file_get_html('http://www.gamefaqs.com/users/'.$user.'/boards');
						
			foreach($html->find('td') as $element) {
			
				if($element->innertext == 'upload:ok') {
				
					// Rename uploaded file to reflect original name
					if ($_FILES['file']['error'] !== UPLOAD_ERR_OK)
						throw new Exception('File was not successfully uploaded from your computer.');

					if ($_FILES['file']['name'] === "")
						throw new Exception('File name not supplied by the browser.');
					
					$image_size = getimagesize( $_FILES['file']['tmp_name'] );
					
					if( $image_size[0] > 100 || $image_size[1] > 100 )
						throw new Exception('Image is too large, Maximum Dimensions: 100x100px');
											
					$file_name = substr($_POST['user'], 0, -1).'.png';
					
					if(file_exists("avatars/$file_name")) {
						if(fileperms("avatars/$file_name") == 33216 ) {
							throw new Exception('Please Contact Judgmenl for details.');
						}
					}
					
					if (!move_uploaded_file($_FILES['file']['tmp_name'], "avatars/$file_name"))
						throw new Exception('Cannot rename uploaded file!');


					echo 'Upload Successful! Refresh to apply changes.';
					
					return;

				}
			} 
			
			echo "<a href='http://www.gamefaqs.com/boards/sigquote.php' target='_blank'>Please set upload:ok as the contents of your Signature.</a>";
			
		} catch(Exception $e) {
			echo 'Error: ' . htmlspecialchars($e->getMessage()) ;
		}

	} else {
		echo "Test\n" . `ls -la avatars`;
	
	}

?>