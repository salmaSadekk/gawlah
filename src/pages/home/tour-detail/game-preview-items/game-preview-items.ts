import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PreviewItemPage } from '../../../test/preview-item/preview-item';

/**
 * Generated class for the GamePreviewItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-preview-items',
  templateUrl: 'game-preview-items.html',
})
export class GamePreviewItemsPage {

  showCard="false" ;
  constructor(private modalCtrl :ModalController) {

  }
  ShowQuestions() {
    console.log("yala") ;
     const modal = this.modalCtrl.create(PreviewItemPage) ;
     modal.present() ;

  }

}
