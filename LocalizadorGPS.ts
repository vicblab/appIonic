// -------------------------------------------
// LocalizadorGPS.ts
// Servicio encargado de ddecirme la posición del teléfono y hacerme saber si me he movido 
// equipo 5
// autor: Víctor Blanco Bataller
// 14/10/2019
// copyright
// -------------------------------------------
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalizadorGPSService {
    private ultimaPosicionMedida;
    ;
    
    constructor(private geolocation: Geolocation) {
        this.ultimaPosicionMedida = { latitud: "", longitud: "", altitud: "" };

    }

    // -------------------------------------------
// -> obtenerMiPosicion() -> Posicion()
    // Método que se encarga de obtener mi posición 
    
// -------------------------------------------

    obtenerMiPosicion() {
        this.geolocation.watchPosition().subscribe(posi => {

            var lat = posi.coords.latitude.toString();
            var long= posi.coords.longitude.toString();
            var alt = posi.coords.altitude.toString();
            var Pos = { latitud: lat, longitud: long, altitud: alt };
          

            return Pos;
        }, err => {
            return this.ultimaPosicionMedida;
        })
    }//obtenerMiPosicion()

       // -------------------------------------------
// -> meHeMovido() -> V/F
    //1. llamar a obtenerMiPosicion()
   // 2. Comparar 1 con ultimaPosicion para ver si hay que devolver true
    //3. Si es true, actualizar ultimaPosicion

// -------------------------------------------
    meHeMovido() {
        var posicionAuxiliar = this.obtenerMiPosicion();

        if (this.ultimaPosicionMedida != posicionAuxiliar) {
            this.ultimaPosicionMedida = posicionAuxiliar;
            return true;
        }
        return false;
    }

}
