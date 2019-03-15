import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Tours } from '../../Models/Tours';
import { ItemsAddPage } from './items-add/items-add';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the TourCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour-creation',
  templateUrl: 'tour-creation.html',
})
export class TourCreationPage {
  tour :Tours = new Tours('','','','','','',[],[]) ;
  img:string='' ;
  constructor(public toastCtrl :ToastController ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourCreationPage');
  }
  onSubmit(f :NgForm) {
    let name = f.value.name ;
  this.tour.name= f.value.name ;
  this.tour.theme = f.value.theme ;
  this.tour.duration =f.value.dur;
  this.tour.mainImage= this.img ;
 
   this.navCtrl.push(ItemsAddPage , {'tour':this.tour ,'index':0}) ;
  }
  Camera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE ,
      sourceType:0
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.img= 'data:image/jpeg;base64,' + imageData;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }
  
}
