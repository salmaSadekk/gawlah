import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamecreationPage } from './gamecreation';

@NgModule({
  declarations: [
    GamecreationPage,
  ],
  imports: [
    IonicPageModule.forChild(GamecreationPage),
  ],
})
export class GamecreationPageModule {}
