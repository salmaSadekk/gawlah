import { Component, OnInit } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { sponsorService } from "../../services/sponsored";

@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid text-center *ngIf="!isFav">
      
      <ion-row>
        <ion-col>
          <button ion-button clear (click)="onAction('sponsor')">Sponsor tour</button>
        </ion-col>
      </ion-row>
    
    </ion-grid>
    <ion-grid text-center *ngIf="isFav">
      
      <ion-row>
        <ion-col>
          <button ion-button clear (click)="addToFavs()">
          <ion-icon color="#ffdf00" name="star"></ion-icon>
          Favorite Tour</button>
        </ion-col>
      </ion-row>
    
    </ion-grid>
  `
})
export class OptionsPage implements OnInit {
  isFav =false ;
  ngOnInit() {
    console.log("fav vlauue" +this.navParams.data) ;
    if (this.navParams.data.fav!=undefined) {
      
     this.isFav= this.navParams.data.fav ;
     console.log("from popover" +this.isFav) ;
    }

  }
    constructor(private viewCtrl: ViewController , private navParams :NavParams) {}
  
    onAction(action: string) {

      this.viewCtrl.dismiss({action: action});
    }
    addToFavs(){
      this.viewCtrl.dismiss({action : 'favorite'}) ;
    }
  }