import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourDetailPage } from './tour-detail';

@NgModule({
  declarations: [
    TourDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TourDetailPage),
  ],
})
export class TourDetailPageModule {}
