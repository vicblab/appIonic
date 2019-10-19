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

import * as ngx from '@ionic-native/ble/ngx';


import { interval } from 'rxjs'
import { LocalizadorGPSService } from './LocalizadorGPS';
import { LaLogicaService } from './LaLogica';
import { Subscription } from 'rxjs';



@Injectable({
    providedIn: 'root'

})
export class ServicioFirebaseService {
 
    private alarmaQueSuenaCadaMinuto: Subscription;
    private alarmaQueSuenaCadaDiezMinutos: Subscription;
    //Collection;
    private uuid = "EPSG-GTI-EQUIPO5";
    private medicion;
    private posicion;
    private momento;
    private miLocalizador;
    private miLogica;
    
    private minuto: number = 5000;
    private diezMinutos: number=20000;
    private noLlamarMas = false;
    
    //Constructor
    constructor(private fireStore: AngularFirestore, private ble: ngx.BLE) {

      
    this.alarmaQueSuenaCadaDiezMinutos = interval(this.diezMinutos)
    .subscribe((val) => { 
        this.hayQueActualizarMedicionesYEnviarlasAlServidor() 
    });
    this.alarmaQueSuenaCadaMinuto = interval(this.minuto)
    .subscribe((val) => {
         if(this.miLocalizador.meHeMovido()){
             this.hayQueActualizarMedicionesYEnviarlasAlServidor();
         }
        });
    this.medicion = { CO: -1, humedad: -1, temperatura: -1 };
        this.posicion = { latitud: "", longitud: "", altitud: "" };
        this.momento=-1;
        //this.Collection = fireStore.collection<any>('data');
        //console.log(this.Collection);
        this.encenderBT();
        this.miLocalizador = new LocalizadorGPSService();
        this.miLogica = new LaLogicaService(this.fireStore);
      
    }
    

    // -------------------------------------------
// uuid: texto -> obtenerMisTramas() -> ()
    // Método que se encarga de captar las tramas de todos los beacon cercanos y hacer un filtrado 
    // para solo actuar si una trama contiene nuestra uuid
// -------------------------------------------

    obtenerMisTramas(callback) { // callback

        /*Function scan scans for BLE devices.The success callback is called each time a peripheral is discovered.
         * Scanning automatically stops after the specified number of seconds.

        {
            "name": "TI SensorTag",
                "id": "BD922605-1B07-4D55-8D09-B66653E51BBA",
                    "rssi": -79,
                        "advertising": ArrayBuffer or map 
        }*/

        this.ble.scan([], 5).subscribe(
            device => {
                //compruebo si la uuid del advertising es mi uuid
                if (String.fromCharCode.apply(null, new Uint8Array(device.advertising.slice(9, 25))).toString() == this.uuid) {
                    //obtengo un nuevo buffer que solo contenga los dos bytes del major y minor a partir del buffer de advertising data
                    var bufferDeSoloMajYMin = device.advertising.slice(25, 29);
                    //convierto el buffer en una lista de dos unsigned int de 2 bytes cada uno
                    var MajYMin = new Uint16Array(bufferDeSoloMajYMin);
                    
                    //El primer elemento del array es el major y el segundo el minor
                    var elMajor = MajYMin[0].toString();
                    var elMinor = MajYMin[1].toString();

                    //Aquí haremos algo con el major y el minor
        //En este caso tratamos el major y el minor como números y por lo tanto, sabiendo que las primeras dos cifras del major
        // son la temperatura, las dos ultimas la humedad y que el minor es la medida de ppb de CO, obtenemos los valores de la siguiente manera:
                    this.medicion.temperatura = Math.floor(+elMajor / 100);
                    this.medicion.humedad = +elMajor - this.medicion.temperatura * 100;
                    this.medicion.CO = +elMinor;
                    callback();

                    //this.obtenerCO(elMajor, elMinor);
                    // elMajor i elMinor -> CO y guardar en var. global
                    // en var global <- pos gps, temps
                    // callback( null )
                }
                //comentar tras las pruebas
                callback();
            });
    }//obtenerMisTramas()

 
    //  
    // actualizarMediciones() <-
    //  pos:Posicion
    //
    actualizarMediciones(callback) {  // callback

        


        this.obtenerMisTramas(() => {
            this.momento = new Date().getTime();
            this.miLocalizador.obtenerMiPosicion((res, err) => {
                if (!err) {
                    this.posicion = res;
                    callback();
                } else {
                    
                    throw err;
                } //pequeño control de errores
                
            })//obtenerMiPosicion()
            callback();
           
        })//obtenerMisTramas()
       
        //this.guardarCO("temperatura: " + temp + ", humedad: " + hum + ", ppb: "+ ppb);
    }

    
        //  
    // obtenerCO <-
    // co:R, t:N, pos:Posicion
    //
    obtenerCO(callback) {

        this.actualizarMediciones(() => {
            var jsonConTodo = { datosMedida: this.medicion, posicion: this.posicion, hora: this.momento };
           
            callback(JSON.stringify(jsonConTodo));//devuelvo los datos parseados en un JSON hecho texto 
            
        }
        );//actualizarMediciones

    }
    
    //--------------------------------------
   // ()--> hayQueActualizarMedicionesYEnviarlasAlServidor()-->
    //---------------------------------------------

    hayQueActualizarMedicionesYEnviarlasAlServidor() {
        this.noLlamarMas = false;
        this.obtenerCO((todosLosDatos) => {
            if (!this.noLlamarMas) {
                this.miLogica.guardarCO(todosLosDatos)
                this.noLlamarMas = true;
            
            }
        });
       
    }

    funcionDepruebaParaImprimirEnPantalla(callback) {
        this.obtenerCO((todosLosDatos) => { callback(todosLosDatos); });
      
    }

  
    
    //-------------------------------------------
    //EncenderBT()
    //Enciende el BT si no está encendido pidiendo permiso
    //-------------------------------
    encenderBT() {
       this.ble.isEnabled().then(() => {
           console.log("bluetooth is enabled all G");
          
        }, () => {
            console.log("bluetooth is not enabled trying to enable it");
            this.ble.enable();
        });
       
    }




}
