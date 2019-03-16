import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Items } from '../../../../Models/Items';
import { MediaObject, Media } from '@ionic-native/media';
import { TabsPage } from '../../../tabs/tabs';

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
hasPrevious=false ;
audio: MediaObject;
currentItem:Items ;
flag=true ;
  constructor(public navCtrl: NavController, public navParams: NavParams , private media: Media , private alertCtrl : AlertController) {
  }

  ionViewWillEnter() {
    console.log('salomaaa') ;
}
ngOnInit() {
  this.items =this.navParams.get('items') ;
  this.index =this.navParams.get('index') ;
  if(this.items[this.index].parentnum>-1) {
    console.log('hasPrevious :'+this.hasPrevious) ;
    this.hasPrevious =true ;
    }
  this.currentItem =this.items[this.index] ;
  console.log('salom'+this.index) ;
  if (this.index==this.items.length-1){
    this.flag =false ;
  }
}
onFinish(){
this.navCtrl.popToRoot() ;
}
onNextItem() {
  
  this.navCtrl.push(DetailItemsPage ,{'items':this.items , 'index':++this.index }) ;
}
onListen(){
  console.log("the audio file Url :" +this.currentItem.audio) ;
  this.audio = this.media.create(this.currentItem.audio);

this.audio.play();
this.audio.setVolume(0.8);
}
onPrevItem(){
  this.navCtrl.push(DetailItemsPage  ,{'items':this.items , 'index':this.items[this.index].parentnum}) ;
  }


  }
 

