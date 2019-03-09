import { Component } from '@angular/core';
import { Tours } from '../../Models/Tours';
import { NavController } from 'ionic-angular';
import { TourDetailPage } from './tour-detail/tour-detail';
import { ToursService } from '../../services/Tours';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours:Tours[] ;
 
   constructor(private navCtrl :NavController ,private toursService :ToursService ) {
   
   }
ionViewWillEnter() {
 this.tours= this.toursService.getTours() ;

 
}
  onClickItem(item:Tours){
  this.navCtrl.push(TourDetailPage ,item) ;
  }

  
    
    }
    
    
  

