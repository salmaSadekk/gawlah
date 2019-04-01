import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { sponsorService } from "../../services/sponsored";

@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid text-center>
      
      <ion-row>
        <ion-col>
          <button ion-button clear (click)="onAction('sponsor')">Sponsor tour</button>
        </ion-col>
      </ion-row>
    
    </ion-grid>
  `
})
export class OptionsPage {
    constructor(private viewCtrl: ViewController) {}
  
    onAction(action: string) {

      this.viewCtrl.dismiss({action: action});
    }
  }