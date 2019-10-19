import { Component } from '@angular/core';
import { ServicioFirebaseService } from '../ReceptorBLE'


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private service: ServicioFirebaseService) {
  
  }

}
