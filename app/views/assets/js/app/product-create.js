$(document).ready(function() {
	
	// editor save function
	var saveEditedImage = function(item) {
		// if still uploading
		// pend and exit
		if (item.upload && item.upload.status == 'loading')
			return item.editor.isUploadPending = true;

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
			item.upload.resend();
		}
		
		// if appended
		// send request
		if (item.appended) {
			// hide current thumbnail (this is only animation)
			item.imageIsUploading = true;
			item.image.addClass('fileuploader-loading').html('');
			item.html.find('.fileuploader-action-popup').hide();
			
			$.post('/api/files/resize', {_file: item.file, _editor: JSON.stringify(item.editor), fileuploader: 1}, function() {
				item.reader.read(function() {
					delete item.imageIsUploading;
					item.html.find('.fileuploader-action-popup').show();
					
					item.popup.html = item.popup.editor = item.editor.crop = item.editor.rotation = null;
					item.renderThumbnail();
				}, null, true);
			});
		}
	};
	
	// enable fileuploader plugin
	$('input[name="files"]').fileuploader({
		limit: 1,
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="/app/views/assets/images/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Перетащите файлы сюда</span></h3>' +
							  '<p>или</p>' +
							  '<div class="fileuploader-input-button"><span>Просмотр файлов</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			onImageLoaded: function(item) {
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
			}
		},
		upload: {
            url: '/api/files/upload',
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            synchron: true,
            beforeSend: function(item) {

       
				//if(item.title.length) item.upload.data.custom_name = item.title;
		

				// add editor to upload data
				// note! that php will automatically adjust _editorr to the file
				if (item.editor && (typeof item.editor.rotation != "undefined" || item.editor.crop)) {
					item.upload.data._editorr = JSON.stringify(item.editor);
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}
					
					// remove success icon that was added in onSuccess callback
					item.html.find('.column-actions .fileuploader-action-success').remove();
				}
			},
            onSuccess: function(result, item) {

                var data = {};
				

				if (result !== null && typeof result === 'object') {
					data = result;
				} else {
					try {
						data = JSON.parse(result);
					} catch (e) {
						data.hasWarnings = true;
					}
				}
                
       
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
				
					var thumbnail = $('input[name="thumbnail"]');
					thumbnail.val(data.files[0].name);

					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item);
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
                    item.html.find('.progress-bar2').fadeOut(400);
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
		onRemove: function(item) {
			$.post('/api/files/remove', {
				file: item.name,
				id: $('input[name="id"]').val()
			});
			$('input[name="thumbnail"]').val('');
		},
		editor: {
			cropper: {
				showGrid: true,
			},
			onSave: function(dataURL, item) {
				saveEditedImage(item);
			}	
		},
		captions: {
            feedback: 'Перетащите файлы сюда',
            feedback2: 'Перетащите файлы сюда',
            drop: 'Перетащите файлы сюда'
        },
	});
	
});