import { Component, NgZone } from '@angular/core';
//import { Tab2PageModule } from './tab2.module'

import { ServicioFirebaseService } from '../ReceptorBLE'
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';

//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';




@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']

})


export class Tab2Page {
    
    devices: any[] = [];
    arr: Array<string> = ["este es de prueba"];
    miLista: string="hola";
   
    
    constructor(public service: ServicioFirebaseService, public toastController: ToastController, private ngZone: NgZone) {

       // this.service = new ServicioFirebaseService(fireStore, ble);
       // this.text = "hello darkness";
    }
   
   

    discover() {
      /* this.ble.scan([], 15).subscribe(
            device => {
                //String.fromCharCode.apply(null, new Uint8Array(device.advertising))
                var buffer=device.advertising.slice(9, 25);

                var adData = String.fromCharCode.apply(null, new Uint8Array(buffer));
               
                device.advertising = adData.toString();
                
                this.onDeviceDiscovered(device);

                err => {
                    this.devices.push(err)
                }
            });*/

       // this.service.funcionDepruebaParaImprimirEnPantalla((res) => { this.onDeviceDiscovered(res); });
       // this.service.AlarmaQueSuenaCadaMinuto();
        this.service.hayQueActualizarMedicionesYEnviarlasAlServidor();
       
       
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
            duration: 2000
        });
        toast.present();
    }
}

