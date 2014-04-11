<?php
	require '../../parameters.php';
	header("Access-Control-Allow-Origin: http://www.gamefaqs.com ");

	if ($_POST) {
	
		// Personal Note: DropboxUploader.php is not mine, and this would not be possible without the example
		// code at [http://jaka.kubje.org/].
		require 'DropboxUploader.php';
	
		try {		
	
			// Rename uploaded file to reflect original name
			if ($_FILES['file']['error'] !== UPLOAD_ERR_OK)
				throw new Exception('File was not successfully uploaded from your computer.');

			$tmpDir = uniqid('/tmp/DropboxUploader-');
			if (!mkdir($tmpDir))
				throw new Exception('Cannot create temporary directory!');

			if ($_FILES['file']['name'] === "")
				throw new Exception('File name not supplied by the browser.');

			$tmpFile = $tmpDir.'/'.substr($_POST['user'], 0, -1).'.png';
			if (!move_uploaded_file($_FILES['file']['tmp_name'], $tmpFile))
				throw new Exception('Cannot rename uploaded file!');
			
			$image_size = getimagesize( $tmpFile );
			
			if( $image_size[0] > 100 || $image_size[1] > 100 )
				throw new Exception('Image is too large, Maximum Dimensions: 100x100px');
			
			
			// Enter your Dropbox account credentials here
			$uploader = new DropboxUploader( _PARAMETER1, _PARAMETER2 );
			$uploader->upload($tmpFile, '/Public/GameFAQs-Avatars');

			echo 'Upload Successful! Refreshing to apply changes...';
		} catch(Exception $e) {
			echo 'Error: ' . htmlspecialchars($e->getMessage()) ;
		}

		// Clean up
		if (isset($tmpFile) && file_exists($tmpFile))
			unlink($tmpFile);

		if (isset($tmpDir) && file_exists($tmpDir))
			rmdir($tmpDir);
	}

?>