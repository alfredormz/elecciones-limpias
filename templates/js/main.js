// Cargar mapa en evento load
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
	})

});
