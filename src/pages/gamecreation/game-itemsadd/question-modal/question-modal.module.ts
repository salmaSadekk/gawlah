import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionModalPage } from './question-modal';

@NgModule({
  declarations: [
    QuestionModalPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionModalPage),
  ],
})
export class QuestionModalPageModule {}
