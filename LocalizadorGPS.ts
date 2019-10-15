// -------------------------------------------
// LocalizadorGPS.ts
// Servicio encargado de ddecirme la posición del teléfono y hacerme saber si me he movido 
// equipo 5
// autor: Víctor Blanco Bataller
// 14/10/2019
// copyright
// -------------------------------------------
import { Injectable } from '@angular/core';

declare var AdvancedGeolocation: any;

@Injectable({
    providedIn: 'root'
})
export class LocalizadorGPSService {
    private ultimaPosicionMedida;
    ;

    constructor() {
        this.ultimaPosicionMedida = { latitud: "", longitud: "", altitud: "" };

    }

    // -------------------------------------------
    // -> obtenerMiPosicion() -> Posicion()
    // Método que se encarga de obtener mi posición 

    // -------------------------------------------

    obtenerMiPosicion(callback) {

        //--------------------------------------------------------------------------
        AdvancedGeolocation.start((success) => {
            //loading.dismiss();
            // this.refreshCurrentUserLocation();
            try {
                var jsonObject = JSON.parse(success);
                console.log("Provider " + JSON.stringify(jsonObject));
                switch (jsonObject.provider) {
                    case "gps":
                        console.log("setting gps ====<<>>" + jsonObject.latitude);
                        var lat = jsonObject.latitude.toString();
                        var long = jsonObject.longitude.toString();
                     
                        var Pos = { latitud: lat, longitud: long, altitud: "" };
                        callback(Pos, null);
                        break;

                    case "network":
                        console.log("setting network ====<<>>" + jsonObject.latitude);

                        var lat = jsonObject.latitude.toString();
                        var long = jsonObject.longitude.toString();

                        var Pos = { latitud: lat, longitud: long, altitud: "" };
                        callback(Pos, null);

                        break;

                    case "satellite":
                        //TODO
                        break;

                    case "cell_info":
                        //TODO
                        break;

                    case "cell_location":
                        //TODO
                        break;

                    case "signal_strength":
                        //TODO
                        break;
                }
            }
            catch (exc) {
                console.log("Invalid JSON: " + exc);
            }
        },
            function (error) {
                console.log("ERROR! " + JSON.stringify(error));
            },
            {
                "minTime": 5000,         // Min time interval between updates (ms)
                "minDistance": 10,       // Min distance between updates (meters)
                "noWarn": true,         // Native location provider warnings
                "providers": "all",     // Return GPS, NETWORK and CELL locations
                "useCache": true,       // Return GPS and NETWORK cached locations
                "satelliteData": false, // Return of GPS satellite info
                "buffer": false,        // Buffer location data
                "bufferSize": 0,         // Max elements in buffer
                "signalStrength": false // Return cell signal strength data
            });

   //-------------------------------------------------------------------------
        

   
    }//obtenerMiPosicion()

       // -------------------------------------------
// -> meHeMovido() -> V/F
    //1. llamar a obtenerMiPosicion()
   // 2. Comparar 1 con ultimaPosicion para ver si hay que devolver true
    //3. Si es true, actualizar ultimaPosicion

// -------------------------------------------
    meHeMovido(callback) {

   this.obtenerMiPosicion(function (res, err) {
            
                if (this.ultimaPosicionMedida != res) {
                    this.ultimaPosicionMedida = res;
                    callback(true,err);
                }
                callback(false,err);
            
        });

       
    }

}
