import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourCreationPage } from './tour-creation';

@NgModule({
  declarations: [
    TourCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(TourCreationPage),
  ],
})
export class TourCreationPageModule {}
