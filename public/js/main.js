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


// Tabs del submisison form
// -------------------------

$("#submission-form").easyWizard({
    showSteps: false,
    showButtons: false,
    submitButton: false,
    debug: true,
    after: function(wizardObj, prevStepObj, currentStepObj) {
        if (currentStepObj) {
            console.log(currentStepObj.attr('id'))
        }
    }
});


// File input
// -------------------------
$('#fileupload-input').fileupload({
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