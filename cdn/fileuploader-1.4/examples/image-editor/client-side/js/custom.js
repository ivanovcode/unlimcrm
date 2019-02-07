$(document).ready(function() {
	
	var saveEditedImage = function(image, item) {
		// set new image
		item.editor._blob = image;
		
		// if still uploading
		// pend and exit
		if (item.upload && item.upload.status == 'loading')
			return item.editor.isUploadPending = true;
		
		// if not uploaded
		if (item.upload && item.upload.send && !item.upload.status) {
			item.editor._namee = item.name;
			return item.upload.send();
		}

		// if not appended or not uploaded
		if (!item.appended && !item.uploaded)
			return;

		// if no editor
		if (!item.editor || !item.reader.width)
			return;
		
		// if uploaded
		// resend upload
		if (item.upload && item.upload.resend) {
			item.editor._namee = item.name;
			item.editor._editingg = true;
			item.upload.resend();
		}
		
		// if appended
		// send request
		if (item.appended) {
			// hide current thumbnail (this is only animation)
			item.imageIsUploading = true;
			item.editor._editingg = true;
			
			var form = new FormData();
			form.append('files[]', item.editor._blob);
			form.append('fileuploader', 1);
			form.append('_namee', item.name);
			form.append('_editingg', true);
			
			$.ajax({
				url: 'php/ajax_upload_file.php',
				data: form,
		  		type: 'POST',
				processData: false,
		  		contentType: false
			});
		}
	};
	
	$('input[name="files"]').fileuploader({
		limit: 20,
		fileMaxSize: 20,
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="../../drag-drop/images/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
							  '<p>or</p>' +
							  '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			popup: {
				onShow: function(item) {
                    item.popup.html.on('click', '[data-action="crop"]', function(e) {
						if (item.editor)
                        	item.editor.cropper();
                    }).on('click', '[data-action="rotate-cw"]', function(e) {
						if (item.editor)
                        	item.editor.rotate();
                    }).on('click', '[data-action="remove"]', function(e) {
                        item.popup.close();
                        item.remove();
                    }).on('click', '[data-action="cancel"]', function(e) {
                        item.popup.close();
                    }).on('click', '[data-action="save"]', function(e) {
						if (item.editor)
                        	item.editor.save(function(blob, item) {
								saveEditedImage(blob, item);
							}, true, null, false);
						
						if (item.popup.close)
							item.popup.close();
                    });
                },	
			},
			onImageLoaded: function(item) {
				if (item.appended)
					return;
				
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
				
				if (!item.imageLoaded)
					item.editor.save(function(blob, item) {
						saveEditedImage(blob, item);
					}, true, null, true);
				
				item.imageLoaded = true;
			},
		},
		upload: {
			url: 'php/ajax_upload_file.php',
			data: null,
			type: 'POST',
			enctype: 'multipart/form-data',
			start: false,
			synchron: true,
			beforeSend: function(item, listEl, parentEl, newInputEl, inputEl) {
				// add image to formData
				if (item.editor && item.editor._blob) {
					item.upload.data.fileuploader = 1;
					item.upload.formData.delete(inputEl.attr('name'));
					item.upload.formData.append(inputEl.attr('name'), item.editor._blob);
					
					// add name to data
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}

					// add is after editing to data
					if (item.editor._editingg) {
						item.upload.data._editingg = true;
					}
				}
			},
			onSuccess: function(result, item) {
                var data = {};
				
				try {
					data = JSON.parse(result);
				} catch (e) {
					data.hasWarnings = true;
				}
                
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item.editor._blob, item);
					}
                }
				
				// if warnings
				if (data.hasWarnings) {
					for (var warning in data.warnings) {
						alert(data.warnings);
					}
					
					item.html.removeClass('upload-successful').addClass('upload-failed');
					// go out from success function by calling onError function
					// in this case we have a animation there
					// you can also response in PHP with 404
					return this.onError ? this.onError(item) : null;
				}
                
                item.html.find('.column-actions').append('<a class="fileuploader-action fileuploader-action-remove fileuploader-action-success" title="Remove"><i></i></a>');
                setTimeout(function() {
                    item.html.find('.progress-bar2').fadeOut(400, function() {
						$(this).find('.fileuploader-progressbar .bar').width(0 + "%");
					});
                }, 400);
            },
            onError: function(item) {
				var progressBar = item.html.find('.progress-bar2');
				
				if(progressBar.length > 0) {
					progressBar.find('span').html(0 + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
					item.html.find('.progress-bar2').fadeOut(400);
				}
                
                item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
                    '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
                ) : null;
            },
            onProgress: function(data, item) {
                var progressBar = item.html.find('.progress-bar2');
				
                if(progressBar.length > 0) {
                    progressBar.show();
                    progressBar.find('span').html(data.percentage + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
                }
            },
			onComplete: null,
		},
		files: [{
			file: 'uploads/picture.jpg',
			name: 'picture.jpg',
			size: 1508,
			type: 'image/jpeg'
		}],
		editor: {
			cropper: {
				showGrid: true
			},
			maxWidth: 800,
			maxHeight: 600,
			quality: 98
		},
		onRemove: function(item) {
			$.post('./php/ajax_remove_file.php', {
				file: item.name
			});
		},
		captions: {
			feedback: 'Drag and drop files here',
			feedback2: 'Drag and drop files here',
			drop: 'Drag and drop files here'
		},
	});
});