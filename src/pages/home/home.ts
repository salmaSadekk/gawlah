import { Component } from '@angular/core';
import { Tours } from '../../Models/Tours';
import { NavController, App } from 'ionic-angular';
import { TourDetailPage } from './tour-detail/tour-detail';
import { ToursService } from '../../services/Tours';
import { TourCreationPage } from '../tour-creation/tour-creation';
import { AuthService } from '../../services/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours:Tours[] ;
 
   constructor(private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService ) {
   
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

  
    
    }
    
    
  

