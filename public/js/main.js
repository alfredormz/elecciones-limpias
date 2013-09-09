$(document).ready(function(){

  $(".step-upload").show();
  $(".step-positioning").hide();

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


}); // ~ Omega

$(function () {

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
          {maxWidth: 200, maxHeight: 200, crop: true}
         );
        if(loadingImage){
          $(".step-upload").hide();
          $(".step-positioning").show();
        }

        $('#upload').click(function () {
            data.submit();
        });
        $('#cancel').click(function () {
            data.abort();
            $(".step-upload").show();
            $(".step-positioning").hide();
            $("#upload-preview").html("");
        });

      });
    },
    done: function(e, data){
      $(".step-upload").show();
      $(".step-positioning").hide();
      $("#upload-preview").html("");
    }
  });

});
