import { Component, NgZone } from '@angular/core';
//import { Tab2PageModule } from './tab2.module'
import { AngularFirestore } from 'angularfire2/firestore';
import { ServicioFirebaseService } from '../ReceptorBLE'
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

const laUuid: string = "EPSG-GTI-PROY-3A";


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']

})


export class Tab2Page {
    
    devices: any[] = [];
    arr: Array<string> = ["este es de prueba"];
    miLista: string="hola";
   
    service: ServicioFirebaseService;
    constructor(private fireStore: AngularFirestore, public toastController: ToastController, private ble: BLE, private ngZone: NgZone, private geolocation: Geolocation, private permissions: AndroidPermissions) {

        this.service = new ServicioFirebaseService(fireStore, ble, geolocation);
       // this.text = "hello darkness";
    }
    ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
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
       
      
        this.service.obtenerMisTramas(laUuid);
       
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

