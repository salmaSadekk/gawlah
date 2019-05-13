import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Items } from '../../../../Models/Items';
import { MediaObject, Media } from '@ionic-native/media';
import { TabsPage } from '../../../tabs/tabs';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

import { TextToSpeech } from '@ionic-native/text-to-speech';

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
  constructor(private tts: TextToSpeech ,private streamingMedia: StreamingMedia ,public navCtrl: NavController, public navParams: NavParams , private media: Media , private alertCtrl : AlertController) {
  }

  ionViewWillEnter() {
  
}
read(data:string){
  this.tts.speak(data)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
}
ngOnInit() {
  this.items =this.navParams.get('items') ;
  this.index =this.navParams.get('index') ;
  if(this.items[this.index].parentnum>-1) {
  
    this.hasPrevious =true ;
    }
  this.currentItem =this.items[this.index] ;
  
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
  
  this.audio = this.media.create(this.currentItem.audio);

this.audio.play();
this.audio.setVolume(0.8);
}
onPrevItem(){
  this.navCtrl.push(DetailItemsPage  ,{'items':this.items , 'index':this.items[this.index].parentnum}) ;
  }
  onWatch(){
 
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    
    this.streamingMedia.playVideo(this.currentItem.video, options);
  }

  }
 

