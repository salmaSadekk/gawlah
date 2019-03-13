import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { availableMonuments } from '../../../services/availableMonuments';
import { Items } from '../../../Models/Items';
import { NgForm } from '@angular/forms';
import { Tours } from '../../../Models/Tours';
import { TabsPage } from '../../tabs/tabs';
import { ToursService } from '../../../services/Tours';

/**
 * Generated class for the ItemsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-add',
  templateUrl: 'items-add.html',
})
export class ItemsAddPage {
   Monum:Items[] ;
   tour:Tours ;
   addBut=false ;
   finishBut=false ;
   index:number ;
   
  constructor(public navCtrl: NavController, public navParams: NavParams , public avMon:availableMonuments ,public TourSer :
    ToursService) {
  }
finish() {
this.finishBut=true ;

}
add() {
  this.addBut=true ;
}
  ionViewWillEnter() {
    this.Monum = this.avMon.getItems() ;
   
  }
 
  onSubmit(f:NgForm) {
    this.tour =this.navParams.get('tour');
    this.index=this.navParams.get('index') ;
   
     
    this.tour.items[this.index]  =this.Monum .find(
      val=>{
        return val.name == f.value.selected ;
      }
    ) ;
    this.tour.items[this.index].addedInfo =f.value.txt ;
   
    if(this.addBut){ 
      this.navCtrl.push(ItemsAddPage ,{'tour':this.tour ,'index':++this.index})

    }
   
    if(this.finishBut){
      console.log('submit finish button') ;
      this.tour.mainImage ="../../assets/imgs/m6.jpg"
      this.TourSer.addTour(this.tour) ;
      this.navCtrl.setRoot(TabsPage) ;
    }
   
    
  }

}
