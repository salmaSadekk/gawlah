import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../../../Models/Items';

/**
 * Generated class for the DetailItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-items',
  templateUrl: 'detail-items.html',
})
export class DetailItemsPage implements OnInit {
items :Items[] ;
index:number ;
currentItem:Items ;
flag=true ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('salomaaa') ;
}
ngOnInit() {
  this.items =this.navParams.get('items') ;
  this.index =this.navParams.get('index') ;

  this.currentItem =this.items[this.index] ;
  console.log('salom'+this.index) ;
  if (this.index==this.items.length-1){
    this.flag =false ;
  }
}
onFinish(){

}
onNextItem() {
  this.navCtrl.push(DetailItemsPage ,{'items':this.items , 'index':++this.index}) ;
}
 
}
