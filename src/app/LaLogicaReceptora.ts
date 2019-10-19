import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaLogicaReceptoraService {

  
    private miColeccion: any;

    constructor(private fireStore: AngularFirestore) {
        this.miColeccion = fireStore.collection<any>('data',
            ref =>
            {
                let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                query = query.orderBy('date');
                return query;

            });
           
       
    }

  
    obtenerCO(callback) {
        // suscribirse a los cambios
      
        this.miColeccion.valueChanges().subscribe(datosEsperados => {
            var ultimoDato = datosEsperados[datosEsperados.length - 1];
            var datosParseados = { date: ultimoDato.date, measurement: ultimoDato.measurement, location: ultimoDato.location };
            callback(datosParseados);
        })
       
    }



}
