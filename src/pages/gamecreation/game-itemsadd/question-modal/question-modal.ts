import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the QuestionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-modal',
  templateUrl: 'question-modal.html',
})
export class QuestionModalPage {
 Choices:string [] =[] ;
 qu :string ='' ;
 hint :string ='' ;
flag:boolean = false ;
 correctAns :string ='' ;

  constructor( private viewCtrl :ViewController,public alertCtrl: AlertController ,public navCtrl: NavController, public navParams: NavParams) {
  }
  delete(i , deleteAll){
    if(deleteAll==true) {
      this.Choices =[] ;
      this.qu ='' ;
    }
    else{
      this.Choices.splice(i ,1) ;
    }
    
  }

  onaddChoices(){
    const prompt = this.alertCtrl.create({
      title: 'Choices',
      message: "Enter a choice for the question you added",
      inputs: [
        {
          name: 'Choice',
          placeholder: 'Choice'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           this.Choices.push(data.Choice) ;
           console.log('choice' +data.Choice) ;
          }
        }
      ]
    });
    prompt.present();
    console.log('daata from prompt' +prompt.data) ;
  }
  answer(choice){
   this.Choices.splice( 
    this.Choices.findIndex(
      res=>{
        console.log('pop' +res ==choice ) ;
        console.log('pop1' +JSON.stringify(this.Choices)) ;
        return res ==choice ;
      }
    ) ,1
   )  ;
   console.log('pop2' +JSON.stringify(this.Choices)) ;
    this. correctAns  = choice ;
  }
  onSubmit(f:NgForm) {
this.qu = f.value.qu ;
this.hint = f.value.hint ;
this.flag=true  ;
  }
  onFinish(){
    let data ={Qu:this.qu , choices :this.Choices , answer : this. correctAns} ;
    console.log('from Question modal'+JSON.stringify(data)) ;
   this.viewCtrl.dismiss(data) ;
  }

}
