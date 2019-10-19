// -------------------------------------------
// tab3.page.ts
// controla lo que se muestra en el tab 3 
// equipo 5
// autor: V�ctor Blanco Bataller
// 19/10/2019
// copyright
// -------------------------------------------
import { Component, NgZone, ViewChild, ElementRef} from '@angular/core';
import { LaLogicaReceptoraService } from '../LaLogicaReceptora'
import{IonContent} from '@ionic/angular'




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})
export class Tab3Page {

   
 // used for scrolling the pane
 @ViewChild(IonContent,{static:false}) content: IonContent;
    datos: any[] = [];
    constructor(public miLogicaReceptora: LaLogicaReceptoraService, private ngZone: NgZone) {
      
    }

     irAbajo(){
        
       // method used to enable scrolling
       this.content.scrollToBottom(1000);    }

    irArriba(){
        this.content.scrollToTop(1000); 
    }

    //------------------------------
    //esta funcion se llama cuando se entra en el tab por primera vez:
    ngOnInit() {
        this.miLogicaReceptora.obtenerCO(dato => {

            this.ngZone.run(() => {
                /*var date= new Date(+(dato.date));
                var hours = date.getHours();
                var minutes = "0" + dato.date.getMinutes();
                var seconds = "0" + dato.date.getSeconds();
                dato.date= hours.toString() + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);*/
                this.datos.push(dato)
               
            })
        })
    }

}
