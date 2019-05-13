import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
  recording: boolean = false;
filePath: string;
fileName: string;
audio: MediaObject;
audioList: any[] = [];
isSet:boolean =false ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private media: Media,
    private file: File ,public platform: Platform , public viewCtrl :ViewController) {
  }
  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  ionViewWillEnter() {
  
  }
  
  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    if(this.audioList.length>0)
    this.audioList.pop() ;
    this.audioList.push(data);
    this.isSet=true ;
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    
  }
  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }
  submit(){
    console.log("the file Path from audioPage :"+ this.filePath) ;
this.viewCtrl.dismiss(this.filePath) ;
  }

}
