import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamePreviewItemsPage } from './game-preview-items';

@NgModule({
  declarations: [
    GamePreviewItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(GamePreviewItemsPage),
  ],
})
export class GamePreviewItemsPageModule {}
