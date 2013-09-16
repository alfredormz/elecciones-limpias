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

});


