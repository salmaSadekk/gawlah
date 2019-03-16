import { Component } from '@angular/core';
import { Tours } from '../../Models/Tours';
import { NavController, App, ToastController } from 'ionic-angular';
import { TourDetailPage } from './tour-detail/tour-detail';
import { ToursService } from '../../services/Tours';
import { TourCreationPage } from '../tour-creation/tour-creation';
import { AuthService } from '../../services/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AudioPage } from '../tour-creation/items-add/audio/audio';
import { File } from '@ionic-native/file';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours:Tours[] ;
 img:string ='' ;
   constructor(private file: File ,private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService , private toastCtrl :ToastController ) {
   
   }
ionViewWillEnter() {
  this.authser.setAuth(true) ;
 this.tours= this.toursService.getTours() ;

 
}
  onClickItem(item:Tours){
  this.navCtrl.push(TourDetailPage ,item) ;
  }
  onTourCreate(){
    this.app.getRootNav().setRoot(TourCreationPage);
  }
  Video(){
   // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
  }
  
    
    }
    
    
  

