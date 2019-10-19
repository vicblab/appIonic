import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ServicioFirebaseService } from '../ReceptorBLE'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@NgModule({
    declarations: [Tab2Page],
   
  imports: [
    IonicModule,
    CommonModule,
      FormsModule,
    
      
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
    providers: [AngularFirestore,
        ServicioFirebaseService]
})
    
export class Tab2PageModule {
  
}
