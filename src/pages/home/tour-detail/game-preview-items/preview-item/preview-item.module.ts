import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewItemPage } from './preview-item';

@NgModule({
  declarations: [
    PreviewItemPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewItemPage),
  ],
})
export class PreviewItemPageModule {}
