import { Component, OnInit } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { sponsorService } from "../../services/sponsored";

@Component({
  selector: 'page-sl-options',
  template: `
   <ion-row>
        <ion-col>
          <button ion-button clear (click)="unFav()">
          <ion-icon color="#ffdf00" name="star"></ion-icon>
          unfavorite Tour</button>
        </ion-col>
      </ion-row>
    
  
  `
})
export class Unfav {
 

  
    constructor(private viewCtrl: ViewController , private navParams :NavParams) {}
  

    unFav(){
      this.viewCtrl.dismiss({action : 'unfavorite'}) ;
    }
  }