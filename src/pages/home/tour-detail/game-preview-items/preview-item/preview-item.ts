import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { game_Items } from '../../../../../Models/game_items';

/**
 * Generated class for the PreviewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-item',
  templateUrl: 'preview-item.html',
})
export class PreviewItemPage implements OnInit{
  //@ViewChild('slides') slides: any;

  slideOptions: any;
  questions :game_Items[] =[] ;
  flashCardFlipped: boolean = false;
  
   
  ShowQuestions:any[]=[] ;
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
ngOnInit() {
this.questions = this.navParams.data.item ;
console.log('Questions ' + JSON.stringify(this.questions))
for(var i =0 ; i<this.questions.length ; i++) {
  var current = this.questions[i][0] ;
  console.log('begin loop Qu:'+JSON.stringify(current)) ;
 var qu = current.question ;
  console.log('choices 1:'+current.choices) ;
  var choices = current.choices.split(',') ;
 
  var correctans = current.correctAns ;
  choices.push(correctans ) ;
 this.shuffle( choices) ;
console.log('choices ' +choices.toString()) ;

this.ShowQuestions.push({
  Qu : qu ,
  choices:choices ,
  correct:correctans ,
  flag:false ,
  flipped : false
})
console.log('choices ' +JSON.stringify(this.ShowQuestions[i])) ;
}
console.log("the item" +JSON.stringify(this.ShowQuestions)) ;
}
  constructor(public navCtrl: NavController , public navParams:NavParams) {

  }

  ionViewDidLoad() {

  }

  selectAnswer(i : number , choice :string){
    if( this.ShowQuestions[i].correct ==choice){
      this.ShowQuestions[i].flag = true ;
    }
    
      this.ShowQuestions[i].flipped= true;
  }


}
