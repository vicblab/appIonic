// -------------------------------------------
// tab2.page.ts
// controla lo que se muestra en el tab 2 
// equipo 5
// autor: V�ctor Blanco Bataller
// 19/10/2019
// copyright
// -------------------------------------------
import { Component, NgZone, ViewChild } from '@angular/core';


import { ServicioFirebaseService } from '../ReceptorBLE'

import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

import {  AngularFirestore } from 'angularfire2/firestore';
import{IonContent} from '@ionic/angular'


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']

})


export class Tab2Page {
    @ViewChild(IonContent,{static:false}) content: IonContent;
    devices: any[] = [];
  
    
   
    
    constructor(private fireStore:AngularFirestore, private ble: BLE,  public toastController: ToastController, private ngZone: NgZone) {

    }
   
   
 //-------------------------------
 // irAbajo()
 // método que hace scroll hacia abajo en la página/app
 //-----------------------------------------
    irAbajo(){
        
        this.content.scrollToBottom(1000);
    }

    //-------------------------------
 // irArriba()
 // método que hace scroll hacia arriba en la página/app
 //-----------------------------------------
    irArriba(){
        this.content.scrollToTop(1000); 
    }

    //--------------------------------------------
    // discover()
    // método que descubre los dispositivos BLE cercanos y si detecta el nuestro cambia su advertising por su uuid, major y minor parseados
    //-----------------------------------------
    discover() {
       this.ble.scan([], 15).subscribe(
            device => {
               if (String.fromCharCode.apply(null, new Uint8Array(device.advertising.slice(9, 25))).toString() == "EPSG-GTI-EQUIPO5") {
                 //obtengo un nuevo buffer que solo contenga los dos bytes del major y minor a partir del buffer de advertising data
                 var bufferDeSoloMajYMin = device.advertising.slice(25, 29);
                 //convierto el buffer en una lista de dos unsigned int de 2 bytes cada uno
                 var MajYMin = new Uint16Array(bufferDeSoloMajYMin);
                device.advertising= "UUID: "+
                String.fromCharCode.apply(null, new Uint8Array(device.advertising.slice(9, 25))).toString() 
                +"MAJOR: "+MajYMin[0].toString()
                "MINOR: "+MajYMin[1].toString()+
                +"\n, ESTE ES MI DISPOSITIVO ^";
                     this.presentToast("¡¡EL DISPOSITIVO ESTÁ CERCA!!");
                     this.onDeviceDiscovered(device);

            }     else{     
                

                var adData = new Uint8Array(device.advertising);
                device.advertising = adData.toString();
                
                this.onDeviceDiscovered(device);

                err => {
                    this.devices.push(err)
                }
            }
            });
                
    }//discover()
    
    //-----------------------------------------------
    // onDeviceDiscovered()
    // Método que guarda el dispositivo descubierto en una lista para que se pueda mostrar en pantalla
    //------------------------------------------------
    onDeviceDiscovered(device) {
        console.log('Discovered' + JSON.stringify(device, null, 2));
        this.ngZone.run(() => {
            this.devices.push(device)
            console.log(device)
        })
    }
    
    //-------------------------------------------------------
    // texto-->presentToast()
    // método que muestra texto mediante un toast
    //--------------------------------------------------
    public async presentToast(texto:string) {
        const toast = await this.toastController.create({
            message: texto,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
}

