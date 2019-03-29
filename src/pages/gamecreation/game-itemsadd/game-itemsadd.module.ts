import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameItemsaddPage } from './game-itemsadd';

@NgModule({
  declarations: [
    GameItemsaddPage,
  ],
  imports: [
    IonicPageModule.forChild(GameItemsaddPage),
  ],
})
export class GameItemsaddPageModule {}
