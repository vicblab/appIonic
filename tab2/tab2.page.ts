import { Component, NgZone } from '@angular/core';
//import { Tab2PageModule } from './tab2.module'
import { AngularFirestore } from 'angularfire2/firestore';
import { ServicioFirebaseService } from '../ReceptorBLE'
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

const laUuid: string = "C2:B6:F0:AA:D3:EF";


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
    constructor(private fireStore: AngularFirestore, public toastController: ToastController, private ble: BLE, private ngZone: NgZone, private BLE: BluetoothSerial, private geolocation: Geolocation, private permissions: AndroidPermissions) {

        this.service = new ServicioFirebaseService(fireStore, ble, BLE, geolocation);
       // this.text = "hello darkness";
    }
    discover() {
  
       // var decoder = new TextDecoder("utf-8");
        this.ble.scan([], 15).subscribe(
            device => {
            
                var adData = new Uint8Array(device.advertising)
                device.advertising = adData.toString();
                this.onDeviceDiscovered(device)//JSON.stringify(decoder.decode(device.advertising)))
                    , err => {
                    this.devices.push(err)
                }
            });
       // this.service.obtenerMisTramas(laUuid);
    }
    
    onDeviceDiscovered(device) {
        console.log('Discovered' + JSON.stringify(device, null, 2));
        this.ngZone.run(() => {
            this.devices.push(device)
            console.log(device)
        })
    }
    
    ngAfterViewInit() {
       // this.permissions.checkPermission("ACCESS_FINE_LOCATION").then(res => {
           // this.permissions.requestPermission("ACCESS_FINE_LOCATION").then(() => { this.presentToast("Localización activada"); 
       
        /*var str="";
        this.service.add("hola");
        this.presentToast("Has enviado hola a la bbdd");
        if (laUuid == null) {
            this.ble.scan([], 15).subscribe(
                device => { str = device.id; }
            );
        } else { str = laUuid }
        */
        this.service.encenderBT();
       // this.service.suscribirse();
           // })
        //});
        //modificar:
      
        
    }
    public async presentToast(texto:string) {
        const toast = await this.toastController.create({
            message: texto,
            duration: 2000
        });
        toast.present();
    }
}

