$(document).ready(function(){

$("#map").gmap3({
	// Geolocalizar dispositivo
	getgeoloc: {
		callback : function(latLng){
			// Inicializar y centrar
			if (latLng){
				$(this).gmap3({
					map:{
						options:{
							center: latLng,
							zoom: 16,
							mapTypeId: google.maps.MapTypeId.TERRAIN
						}
					}
				});
			}
			// O preguntar lugar al usuario 
			else {
				// Disparar modal
			}
		}
	}
});


/*jslint unparam: true */
/*global window, $ */
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/php/';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});


}); // ~ Omega