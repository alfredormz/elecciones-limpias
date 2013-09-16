$(document).ready(function(){

  // Mapa
  // -------------------------

  // Geolocalizar dispositivo y mostrar mapa al arrancar
  $("#map").gmap3({
    getgeoloc: {
      callback : function(latLng){
        // Inicializar y centrar
        if (latLng){
          $("#submission-lat").val(latLng.pb);
          $("#submission-lng").val(latLng.qb);

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
            },
            marker: {
              latLng: latLng,
              options: {
                draggable: true
              },
              events: {
                dragend: function(marker){
                  $("#submission-lat").val(marker.position.pb);
                  $("#submission-lng").val(marker.position.qb);
                }
              }

            },
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

});


