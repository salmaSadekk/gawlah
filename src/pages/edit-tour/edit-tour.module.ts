import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTourPage } from './edit-tour';

@NgModule({
  declarations: [
    EditTourPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTourPage),
  ],
})
export class EditTourPageModule {}
