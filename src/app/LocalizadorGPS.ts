// -------------------------------------------
// LocalizadorGPS.ts
// Servicio encargado de ddecirme la posici�n del tel�fono y hacerme saber si me he movido 
// equipo 5
// autor: V�ctor Blanco Bataller
// 14/10/2019
// copyright
// -------------------------------------------
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var AdvancedGeolocation: any;

@Injectable({
    providedIn: 'root'
})
export class LocalizadorGPSService {
    private ultimaPosicionMedida;
    private posicionActual;

    constructor(private platform: Platform) {
        if(platform.is('cordova')){
        this.ultimaPosicionMedida = { latitud: "", longitud: "", altitud: "" };
        this.posicionActual={ latitud: "", longitud: "", altitud: "" };
this.iniciarGPS();
        }
    }

    // -------------------------------------------
    // -> obtenerMiPosicion() -> Posicion()
    // M�todo que se encarga de obtener mi posici�n 

    // -------------------------------------------

   obtenerMiPosicion(callback){
       callback(this.posicionActual, null);
   }//obtenerMiPosicion


   // -------------------------------------------
    // -> iniciarGPS() -> 
    // M�todo que coloca un escuchador en el GPS

    // -------------------------------------------
    iniciarGPS() {

        //--------------------------------------------------------------------------
        AdvancedGeolocation.start((success) => {
            //loading.dismiss();
            // this.refreshCurrentUserLocation();
            try {
                var jsonObject = JSON.parse(success);
                var lat = jsonObject.latitude.toString();
                var long = jsonObject.longitude.toString();
                var alt = jsonObject.altitude.toString();
               var Pos  = { latitud: lat, longitud: long, altitud: alt };
                console.log("Provider " + JSON.stringify(jsonObject));
                switch (jsonObject.provider) {
                    case "gps":
                        console.log("setting gps ====<<>>" + jsonObject.latitude);
                      
                        this.posicionActual=Pos;
                        break;

                    case "network":
                        console.log("setting network ====<<>>" + jsonObject.latitude);

                     this.posicionActual=Pos;

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
                //callback(this.ultimaPosicionMedida, null);//comentar
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
   
    }//iniciarGPS


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
