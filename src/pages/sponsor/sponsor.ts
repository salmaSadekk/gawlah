import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Tours } from '../../Models/Tours';
import { sponsorService } from '../../services/sponsored';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { CaptureVideoOptions, MediaFile, CaptureError, MediaCapture } from '@ionic-native/media-capture';

/**
 * Generated class for the SponsorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html',
})
export class SponsorPage {
  Sponsored :Tours[]=[] ;
  logo='' ;
  advertisment ='' ;
  first=true ;
  second=false ;
  third=false ;
  mod='' ;
  lang='' ;
  country='' ;
  gender='' ;
  type='Tours' ;
  video='' ;
  slides = [
    {
      title: "Sponsor our Tours!",
      description: "Choose our Amazing tours for your advertisment",
      image: "../../assets/imgs/sponsor.jpg",
    }
  ];
  choices=[
    {text:'Brand awareness' , value:'Brand awareness'} ,{text:'Engagement', value:'Brand awareness'}
  ]

  constructor(private mediaCapture: MediaCapture,public toastCtrl :ToastController,public camera :Camera,public actionSheetCtrl :ActionSheetController ,public navCtrl: NavController ,private sponsorService :sponsorService) {
    console.log(this.slides.length) ;

  }
  addTours(){

    this.navCtrl.push(HomePage ,{flag:true , type: this.type}) ;
  }
  ionViewWillEnter() {
 
    this.Sponsored =this.sponsorService.tours.slice() ;
    console.log('ionViewWillEnter' + this.Sponsored.length) ;
  }
  logoadd(){

  }
  pay(){
    this.first =true ;
    this.second =false
    this.third =false;
    this.navCtrl.pop() ;

  }
  videoCapture() {
  
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {console.log(data[0].fullPath) ;
        this.video= data[0].fullPath ; },
        (err: CaptureError) => console.error(err)
      );
  }
  presentActionSheet(type) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add a picture',
      buttons: [
        {
          text: 'Camera',
          
          handler: () => {
            console.log('Destructive clicked');
            this. Camera(1 , type) ;
          }
        },{
          text: 'from gallery',
         
          handler: () => {
            this. Camera(0,type) ;
          } },
          {
            text: 'cancel',
            role :'cancel',
           
            handler: () => {
            console.log('cancelled')
            }
        }
      ]
    });
    actionSheet.present();
  }
  Camera(source , type){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE ,
      sourceType:source
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     if(type=='logo')
     this.logo= 'data:image/jpeg;base64,' + imageData;
     else
this.advertisment= 'data:image/jpeg;base64,' + imageData;
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
     //this.fileTransfer(base64Image) ;
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  } 

}
