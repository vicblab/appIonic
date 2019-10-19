import { Component, NgZone } from '@angular/core';
//import { Tab2PageModule } from './tab2.module'

import { ServicioFirebaseService } from '../ReceptorBLE'
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import {  AngularFirestore } from 'angularfire2/firestore';



@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']

})


export class Tab2Page {
    
    devices: any[] = [];
  
    
   
    
    constructor(private fireStore:AngularFirestore, private ble: BLE,  public toastController: ToastController, private ngZone: NgZone) {

        //this.service = new ServicioFirebaseService(fireStore, ble);
       // this.text = "hello darkness";
    }
   
   

    discover() {
       this.ble.scan([], 15).subscribe(
            device => {
                
                //String.fromCharCode.apply(null, new Uint8Array(device.advertising))
                var buffer=device.advertising.slice(9, 25);

                var adData = new Uint8Array(device.advertising);//String.fromCharCode.apply(null, new Uint8Array(buffer));
               
                device.advertising = adData.toString();
                
                this.onDeviceDiscovered(device);

                err => {
                    this.devices.push(err)
                }
            });
console.log("hola");
        //this.service.hayQueActualizarMedicionesYEnviarlasAlServidor((res) => { this.presentToast("Has enviado: "+res); });
       // this.service.AlarmaQueSuenaCadaMinuto();
        //this.service.hayQueActualizarMedicionesYEnviarlasAlServidor();
       
       
    }
    
    onDeviceDiscovered(device) {
        console.log('Discovered' + JSON.stringify(device, null, 2));
        this.ngZone.run(() => {
            this.devices.push(device)
            console.log(device)
        })
    }
    

    public async presentToast(texto:string) {
        const toast = await this.toastController.create({
            message: texto,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
}

