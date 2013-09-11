$(document).ready(function(){

// Mapa
// -------------------------

// Geolocalizar dispositivo y mostrar mapa al arrancar
$("#map").gmap3({
    getgeoloc: {
        callback : function(latLng){
            // Inicializar y centrar
            if (latLng){
                $(this).gmap3({
                    map:{
                        options:{
                            center: latLng,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            navigationControl: false,
                            streetViewControl: false,
                            overviewMapControl: false,
                            panControl: false
                        }
                    }
                });
            }
            // O sino preguntar lugar al usuario 
            else {
                // Mostrar modal con lugares recuperados de BD
                // bootbox.alert("No pudimos geolocalizar tu dispositivo");
            }
        }
    }
});


// Scripts del submisison form
// -------------------------

$("#submission-form").easyWizard({
    showSteps: false,
    showButtons: false,
    submitButton: false,
    debug: true,
    // after: Al entrar en un step
    after: function(wizardObj, prevStepObj, currentStepObj) {
        // After Step 2 Locate
        // ---------------
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
                        // Rellenar los campos de latlng con geolocalización o centro actual del mapa si no se puede geolocalizar
                        if (latLng) {
                            currentLatLng = latLng
                        }else{
                            currentLatLng = map.getCenter()
                        }

                        setSubmissionLatlng(currentLatLng);

                        $(this).gmap3({
                            // Visalizar lugar
                            getmaxzoom:{ 
                                latLng: currentLatLng,
                                callback:function(zoom){
                                    map.setCenter( currentLatLng );
                                    map.setZoom( zoom - 2 );
                                }
                            },
                            // Agregar un marcador arrastrable
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

            // TODO: antes de agregar el marcador editable, habria que quitar todos los otros que ya estan en el mapa o cambiarlos de color para que el usuario entienda cual es el suyo

        } // Fin step 2 - locate
    },

    // before: Antes de salir de un step
    before: function(wizardObj, currentStepObj, nextStepObj) {
        // Before Step 2 Locate
        // Antes de salir del paso 2 habría que tomar ese marcador y hacerlo no-arrastrable
        // ---------------
        if (currentStepObj.attr('id') == 'step-locate') {
            // $("#map").gmap3({
            //     get: {
            //         name:"marker",
            //         all: true,
            //         callback: function(objs){
            //             $.each(objs, function(i, obj){
            //                 obj.setADraggable(false);
            //             });
            //         }
            //     }
            // });
        }
    }
});


// File input
// -------------------------
$('#submission-form').fileupload({
    dataType: 'json',
    url: '/upload',
    previewMaxWidth: 200,
    previewMaxHeight: 200,
    previewCrop: true,
    autoupload: false
}).on('fileuploadadd', function(e, data){
    $.each(data.files, function (index, file) {
        var loadingImage = loadImage(
            file,
            function (img) {
                $("#upload-preview").html(img);
            },
            { maxWidth: 150, maxHeight: 150, crop: true }
        );
        if(loadingImage){
            $('#submission-form').easyWizard('goToStep', 2);
        }
        // $('#upload').click(function () {
        //     data.submit();
        // });
        $('#submission-cancel').click(function () {
            data.abort();
            $(".step-upload").show();
            $(".step-positioning").hide();
            $("#upload-preview").html("");
        });
    });
}).on('fileuploadprogressall', function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('#upload-progress .progress-bar').css(
        'width',
        progress + '%'
    );
}).on('fileuploaddone', function (e, data) {
    // TODO: Mostrar el mapa con la foto recién cargada desplegada y volver el wizard al paso 1
    $("#upload-preview").html("");
});


$("#step-locate-done").click(function(){
    $('#submission-form').easyWizard('goToStep', 3);
});

$("#submission-cancel").click(function(){
    $('#submission-form').easyWizard('goToStep', 1);
});

}); // ~ Omega
