import { Component, NgZone, ViewChild} from '@angular/core';
import { LaLogicaReceptoraService } from '../LaLogicaReceptora'





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})
export class Tab3Page {

    @ViewChild('content',{read:{},static:true}) content:any;

    datos: any[] = [];
    constructor(public miLogicaReceptora: LaLogicaReceptoraService, private ngZone: NgZone) {
      
    }

    irAbajo(){
        
        setTimeout(() => {
            this.content.scrollToBottom(300);//300ms animation speed
          });
    }

    ngOnInit() {
        this.miLogicaReceptora.obtenerCO(dato => {

            this.ngZone.run(() => {
                /*var date= new Date(+(dato.date));
                var hours = date.getHours();
                var minutes = "0" + dato.date.getMinutes();
                var seconds = "0" + dato.date.getSeconds();
                dato.date= hours.toString() + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);*/
                this.datos.push(dato)
               this.irAbajo();
            })
        })
    }

}
