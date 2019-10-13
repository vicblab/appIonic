// -------------------------------------------
// ReceptorBLE.ts
// Servicio encargado de recibir las tramas del beacon BLE y 
// enviar los datos de CO encapsulados en ellas junto con info adicional a firestore
// equipo 5
// autor: Víctor Blanco Bataller
// 13/10/2019
// copyright
// -------------------------------------------
import { Injectable } from '@angular/core';

import {  AngularFirestore } from 'angularfire2/firestore';

import { BLE } from '@ionic-native/ble/ngx';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Tab2Page } from './tab2/tab2.page';
//import { setTimeout } from 'timers';


@Injectable({
  providedIn: 'root'
})
export class ServicioFirebaseService {
 
    
    Collection;

    constructor(private fireStore: AngularFirestore,private ble: BLE,  private geolocation: Geolocation) {
        this.Collection = fireStore.collection<any>('data');
        console.log(this.Collection);
        this.encenderBT();
       
      
    }
    

    // -------------------------------------------
// uuid: texto -> obtenerMisTramas() -> ()
    // Método que se encarga de captar las tramas de todos los beacon cercanos y hacer un filtrado 
    // para solo actuar si una trama contiene nuestra uuid
// -------------------------------------------
    obtenerMisTramas(uuid:string) {
        this.ble.scan([], 14).subscribe(
            device => {
                //compruebo si la uuid del advertising es mi uuid
                if (String.fromCharCode.apply(null, new Uint8Array(device.advertising.slice(9, 25))).toString() == uuid) {
                    //obtengo un nuevo buffer que solo contenga los dos bytes del major y minor a partir del buffer de advertising data
                    var bufferDeSoloMajYMin = device.advertising.slice(25, 29);
                    //convierto el buffer en una lista de dos unsigned int de 2 bytes cada uno
                    var MajYMin = new Uint16Array(bufferDeSoloMajYMin);
                    
                    //El primer elemento del array es el major y el segundo el minor
                    var elMajor = MajYMin[0].toString();
                    var elMinor = MajYMin[1].toString();
                    this.obtenerCO(elMajor, elMinor);
                }
            });
    }//obtenerMisTramas()


    obtenerCO(elMajor: string, elMinor: string) {
        //Aquí haremos algo con el major y el minor
        //En este caso tratamos el major y el minor como números y por lo tanto, sabiendo que las primeras dos cifras del major
        // son la temperatura, las dos ultimas la humedad y que el minor es la medida de ppb de CO, obtenemos los valores de la siguiente manera:
        var temp = Math.floor(+elMajor / 100);
        var hum = +elMajor - temp*100;
        var ppb = +elMinor;
        this.guardarCO("temperatura: " + temp + ", humedad: " + hum + ", ppb: "+ ppb);
    }
   

    encenderBT() {
       this.ble.isEnabled().then(() => {
           console.log("bluetooth is enabled all G");
          
        }, () => {
            console.log("bluetooth is not enabled trying to enable it");
            this.ble.enable();
        });
       
    }


    async getPosicion(lat:any, long:any) {
        this.geolocation.watchPosition().subscribe(posi => {
            lat = posi.coords.latitude.toString();
            long = posi.coords.longitude.toString();
            // alt = posi.coords.altitude.toString();
        }, err => {
            //   Tab2Page.prototype.presentToast("aaaaaaaaaaaaa");
            // Other info you want to add here
        })
    }



    guardarCO(data: string) {
        var now = new Date().getTime().toString();
        var lat = "";
        var long = "";
        var alt = "";
        
            this.Collection.add({
                location: 'Latitud: ' + lat + ', Longitud: ' +long + 'Altitud: ' + alt,
                date: now,
                measurement: data,
                // Other info you want to add here
            })
            
     
        
    }
}
