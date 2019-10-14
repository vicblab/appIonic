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

    guardarCO(datosJson: string) {
        
        var jsonFuncional = JSON.parse(datosJson);
        this.miColeccion.add({
            location: JSON.stringify(jsonFuncional.posicion),
            date: jsonFuncional.hora.toString(),
            measurement: JSON.stringify(jsonFuncional.datosMedida),
            // Other info you want to add here
        })



    }
}
