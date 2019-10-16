import { Component, NgZone } from '@angular/core';
import { LaLogicaReceptoraService } from '../LaLogicaReceptora'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    datos: any[] = [];
    constructor(public miLogicaReceptora: LaLogicaReceptoraService, private ngZone: NgZone) {

    }

    ngOnInit() {
        this.miLogicaReceptora.obtenerCO(dato => {

            this.ngZone.run(() => {
                this.datos.push(dato)
               
            })
        })
    }

}
