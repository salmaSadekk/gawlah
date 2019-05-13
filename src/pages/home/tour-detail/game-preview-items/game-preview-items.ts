import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PreviewItemPage } from './preview-item/preview-item';
import { game_Items } from '../../../../Models/game_items';

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
export class GamePreviewItemsPage implements OnInit {

  items : game_Items[]=[] ;
  
 ngOnInit() {
  this.items =this.navParams.get('items') ;
  
 }
  showCard="false" ;
  constructor(private modalCtrl :ModalController , private navParams :NavParams) {

  }
  ShowQuestions(item) {
    console.log('sent Item :' + JSON.stringify(item)) ;
     const modal = this.modalCtrl.create(PreviewItemPage , {item:item.arr}) ;
     modal.present() ;

  }

}
