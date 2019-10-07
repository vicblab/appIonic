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
       // this.suscribirse();
      
    }
    


    obtenerMisTramas(id:string) {
        this.ble.scan([], 14).subscribe(
            device => {
                if (device.id == id) {
                    var adData = new Uint8Array(device.advertising)
                    //Obtengo los 2 bytes del major y los 2 bytes del minor
                    var elMajor = adData[37].toString() + adData[38].toString();
                    var elMinor = adData[39].toString() + adData[40].toString();
                    this.obtenerCO(elMajor, elMinor);
                }
            });
    }

    obtenerCO(elMajor: string, elMinor: string) {
        //Aquí haremos algo con el major y el minor
        this.guardarCO("major: " + elMajor + ", minor: " + elMinor);
    }
    /*
    suscribirse() {



       this.btle.subscribe('\n').subscribe(res => {
           var dato: string = JSON.stringify(res);
           if (dato.toString().includes("Victor")) {
               this.guardarCO(dato);
           }
        }, err => { throw(err)});
    }
    */
    /*función comprobante que se llama a sí misma cada medio segundo y se suscribe si el bt esá activo y el dispositivo está conectado
    conectarse(id: string) {
        this.ble.autoConnect(id, () => { this.suscribirse() }, () => { })
    }
    */
    //scan devices comprueba si el bt está activado, si lo está comprueba si está conectado, si lo está se suscribe, si no lo está muestra
    //las opciones de bt y llama a la función comprobante conectarse
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
