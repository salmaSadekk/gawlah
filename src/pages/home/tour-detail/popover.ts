import { Component, OnInit } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { Review } from "../../../Models/Review";


@Component({
  selector: 'reviewPopover',
  template: `
  <ion-item>
  <ion-avatar item-start>
    <img [src]="review.user.profilePic"  (click) ="showProfile(review.user)">
  </ion-avatar>
  <h2><b>username :</b>{{review.user.name}}</h2>
  <h2><b>review :</b>{{review.content}}</h2>
  <br>
  <h2><b>user's rating</b></h2>
  <ionic3-star-rating 
  
  activeIcon = "ios-star"
  defaultIcon = "ios-star-outline"
  activeColor = "#3c6894" 
  defaultColor = "#c2cfd8"
  readonly="true"
  [rating]="review.rating">
</ionic3-star-rating>
</ion-item>
  `
})
export class reviewdetail implements OnInit {
  review:Review ;
  ngOnInit() {
    console.log("fav vlauue" +this.navParams.data) ;
    if (this.navParams.data.rev!=undefined) {
      
     this.review= this.navParams.data.rev ;
     console.log("from popover" +this.review) ;
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