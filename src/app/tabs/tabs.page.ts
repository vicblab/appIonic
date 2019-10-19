// -------------------------------------------
// tabs.page.ts
// controla los tabs
// equipo 5
// autor: V�ctor Blanco Bataller
// 19/10/2019
// copyright
// -------------------------------------------
import { Component } from '@angular/core';
import { ServicioFirebaseService } from '../ReceptorBLE'


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
 //declaro el servicio de ReceptorBLE para iniciar todo:
  constructor(private service: ServicioFirebaseService) {
  
  }

}
