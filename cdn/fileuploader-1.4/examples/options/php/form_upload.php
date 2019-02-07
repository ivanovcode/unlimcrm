<?php
    include('../../../src/class.fileuploader.php');
	
	// initialize FileUploader
    $FileUploader = new FileUploader('files', array(
        'limit' => null,
        'maxSize' => null,
		'fileMaxSize' => null,
        'extensions' => null,
        'required' => false,
        'uploadDir' => '../uploads/',
        'title' => 'name',
		'replace' => false,
		'editor' => array(
			'maxWidth' => null,
			'maxHeight' => null,
			'crop' => false,
			'quality' => 90
		),
        'listInput' => true,
        'files' => null,
		'move_uploaded_file' => function($temp_name, $destination) {
			return move_uploaded_file($temp_name, $destination);	
		},
		'validate_file' => function($file, $options) {
			$isValid = true;
			if ($isValid) {
				return true;
			} else {
				return "Wrong file!";
			}
		}
    ));

	// unlink the files
	// !important only for appended files
	// you will need to give the array with appendend files in 'files' option of the fileUploader
	foreach($FileUploader->getRemovedFiles('file') as $key=>$value) {
		unlink('../uploads/' . $value['name']);
	}
	
	// call to upload the files
    $data = $FileUploader->upload();

    // if uploaded and success
    if($data['isSuccess'] && count($data['files']) > 0) {
        // get uploaded files
        $uploadedFiles = $data['files'];
    }
	if($data['hasWarnings']) {
        $warnings = $data['warnings'];
        
   		echo '<pre>';
        print_r($warnings);
		echo '</pre>';
    }
	
	// get listInput value
	$FileUploader->getListInput();

	// get removed list
	$FileUploader->getRemovedFiles();

	// get the HTML generated input
	$FileUploader->generateInput();
	
    // get the fileList
	// give a parameter (ex: 'file' or 'name' or 'data.url') to generate a custom input list of the files
	$fileList = $FileUploader->getFileList();
	
	// show
	echo '<pre>';
	print_r($fileList);
	echo '</pre>';