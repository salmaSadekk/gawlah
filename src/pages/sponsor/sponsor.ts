import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Tours } from '../../Models/Tours';
import { sponsorService } from '../../services/sponsored';

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
  first=true ;
  second=false ;
  third=false ;
  mod='' ;
  lang='' ;
  country='' ;
  gender='' ;
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

  constructor(public navCtrl: NavController ,private sponsorService :sponsorService) {
    console.log(this.slides.length) ;

  }
  addTours(){

    this.navCtrl.push(HomePage ,{flag:true}) ;
  }
  ionViewWillEnter() {
 
    this.Sponsored =this.sponsorService.tours.slice() ;
    console.log('ionViewWillEnter' + this.Sponsored.length) ;
  }

}
