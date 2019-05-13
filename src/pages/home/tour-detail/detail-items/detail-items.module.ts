import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailItemsPage } from './detail-items';

@NgModule({
  declarations: [
    DetailItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailItemsPage),
  ],
})
export class DetailItemsPageModule {}
