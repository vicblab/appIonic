// -------------------------------------------
// LaLogica.ts
// Servicio encargado de enviar los datos de CO, temperatura, humedad, hora y posición a firestore
// equipo 5
// autor: Víctor Blanco Bataller
// 13/10/2019
// copyright
// -------------------------------------------
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class LaLogicaService {

    private miColeccion;

    constructor(private fireStore: AngularFirestore) {
        this.miColeccion = fireStore.collection<any>('data');
    }

  //--------------------------------------------------
  //CO, temp, hum, hora, posición--> guardarCO()
  // método que guarda los datos en mi base de datos de firestore
  //----------------------------------------------------------
    guardarCO(datosJson: string) {
        
        var jsonFuncional = JSON.parse(datosJson);
        this.miColeccion.add({
            location: JSON.stringify(jsonFuncional.posicion),
            date: jsonFuncional.hora.toString(),
            measurement: JSON.stringify(jsonFuncional.datosMedida),
           // valid: "yes"
            // Other info you want to add here
        })



    }//guardarCO()
}
