$(document).ready(function(){

// Mapa
// -------------------------

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
                            mapTypeId: google.maps.MapTypeId.TERRAIN,
                            mapTypeControl: false,
                            navigationControl: false,
                            streetViewControl: false,
                            overviewMapControl: false
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


// Tabs del submisison form
// -------------------------

$("#submission-form").easyWizard({
    showSteps: false,
    showButtons: false,
    submitButton: false,
    debug: true,
    after: function(wizardObj, prevStepObj, currentStepObj) {
        // Step 2 - locate
        if (currentStepObj.attr('id') == 'step-locate') {
            
            var currentLatLng,
                map = $("#map").gmap3('get'),
                setSubmissionLatlng = function(latLng){
                    console.log(latLng);
                    $("#submission-lat").val( latLng.lat() );
                    $("#submission-lng").val( latLng.lng() );
                };

            $("#step-locate-done").button('loading');

            // Geolocalizar el dispositivo, agregar un marcador, refrescar los inputs de latlng
            $("#map").gmap3({
                getgeoloc: {
                    callback : function(latLng){
                        if (latLng) {
                            currentLatLng = latLng
                        }else{
                            currentLatLng = map.getCenter()
                        }

                        setSubmissionLatlng(currentLatLng);

                        $(this).gmap3({
                            getmaxzoom:{ 
                                latLng: currentLatLng,
                                callback:function(zoom){
                                    map.setCenter( currentLatLng );
                                    map.setZoom( zoom - 1 );
                                }
                            },
                            marker:{ 
                                latLng: currentLatLng,
                                options: { 
                                    animation: google.maps.Animation.DROP,
                                    draggable: true 
                                },
                                events: {
                                    dragend: function(marker, event, context){
                                        setSubmissionLatlng( marker.getPosition() );
                                    }
                                }
                            }
                        });

                        $("#step-locate-done").button('reset');

                    }
                }
            });
        } // Fin step 2 - locate
    }
});


// File input
// -------------------------
$('#submission-file').fileupload({
    dataType: 'json',
    url: '/upload',
    previewMaxWidth: 200,
    previewMaxHeight: 200,
    previewCrop: true,
    add: function(e, data){
        $.each(data.files, function (index, file) {
            var loadingImage = loadImage(
                file,
                function (img) {
                    $("#upload-preview").html(img);
                },
                { maxWidth: 150, maxHeight: 150, crop: true }
            );
            if(loadingImage){
                $('#submission-form').easyWizard('nextStep');
            }
            // $('#upload').click(function () {
            //     data.submit();
            // });
            $('#cancel').click(function () {
                data.abort();
                $(".step-upload").show();
                $(".step-positioning").hide();
                $("#upload-preview").html("");
            });

        });
    },
    done: function(e, data){
        // Mostrar el mapa con la foto recién cargada
        $("#upload-preview").html("");
        $('#submission-form').easyWizard('nextStep');
    }
  });

}); // ~ Omega
