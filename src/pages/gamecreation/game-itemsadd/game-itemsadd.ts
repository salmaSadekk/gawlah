import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { QuestionModalPage } from './question-modal/question-modal';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../../tabs/tabs';
import { AuthService } from '../../../services/auth';
import { Items } from '../../../Models/Items';
import { Tours } from '../../../Models/Tours';

/**
 * Generated class for the GameItemsaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-itemsadd',
  templateUrl: 'game-itemsadd.html',
})
export class GameItemsaddPage implements OnInit {
  Monum:Items[] =[];
  Monument :Items ;
   tour:Tours ;
   addBut=false ;
   finishBut=false ;
   index:number ;
   img:string ='' ;
   audio='' ;
   video='' ;
   flagVideo =true ;
   flag=true ;
   /*-------------------------------------------------------------------------------*/
   Questions =[] ;
  constructor(private alertCtrl :AlertController,private authservice:AuthService ,private modalCtrl  : ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }
  openModal(){
   const modal = this.modalCtrl.create(QuestionModalPage) ;
modal.present() ;
  }
  finish() {
  
    this.finishBut=true ;
    this. onSubmit() ;
    
    }
    add() {
     
      this.addBut=true ;
      this. onSubmit() ;
    }
      ngOnInit() {
        this.tour =this.navParams.get('tour');
        let url = this.authservice.get_items ;
console.log('the museum id from game items add' + this.tour.name) ;
     this.authservice.SendData({item:this.tour.name} , url).then(
       res=>{
         console.log(res.data) ;
         console.log(res.error) ;
         console.log(res.headers) ;
         console.log(res.status) ;
         console.log(res.url) ;
        let dataFromServer = JSON.parse(res.data) ; 
      
        for(var i=0 ;i<dataFromServer.length ; i++) {
          this.Monum.push(new Items(dataFromServer[i].item_id ,dataFromServer[i].item_name ,
            '',dataFromServer[i].basic_info,'','','',-1 ,-1 ,'') ) ;
        }

       }
     ) ;
       
      }
 
     
      onSubmit() {
       
        this.index=this.navParams.get('index') ;
        const item =this.tour.items[this.index];
        console.log('Game Id ' + this.tour.uid ) ;
        var data ={
     
       // game_id: this.tour.uid ,
       game_id: this.tour.uid ,
        item_id: item.uid ,
        Questions:this.Questions 
          
       
      
        }
        console.log('ONsubmit' + JSON.stringify(this.Questions )) ;
           // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
           let url = this.authservice.game_items ;
        this.authservice.SendData( data , url).then(res=>
         { console.log('sendData items-add :' +res.data) ;
         console.log(res.error) ;
         console.log(res.headers) ;
         console.log(res.status) ;
         console.log(res.url) ;
         
         let dataFromServer = JSON.parse(res.data) ;
        }
        ).catch(error=>
          console.log(error))  ;
        
        
       
        if(this.addBut){ 
          this.navCtrl.push(GameItemsaddPage ,{'tour':this.tour ,'index':++this.index})
    
        }
       
        if(this.finishBut){
          console.log('submit finish button') ;
        
          
         // this.TourSer.addTour(this.tour) ;
          this.navCtrl.setRoot(TabsPage) ;
        }
         
       
        
      }
      
     
   
   
    
     
      
      onCancel(){
        const confirm = this.alertCtrl.create({
          title: 'Are you sure you want to cancel?',
          message: 'if you cancel all your progress will be dismissed',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                console.log('Canceled clicked');
              }
            } ,
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.setRoot(TabsPage) ;
              }
            }
            
          ]
        });
        confirm.present();
      }
      onaddChoices(){
        console.log('the currently selected mon' +this.Monument.uid)
      let modal = this.modalCtrl.create(QuestionModalPage) ;
        modal.present();
        modal.onDidDismiss((data)=>{
          
         this.Questions.push({
          Qu:data.Qu , choices :data.choices , hint :data.hint , correct_answer :data.answer 
         }) ;
       console.log('game-itemadd' + data.qu ) ;
        }
       
        )
      }
  
      onSubmit1(f:NgForm){
        this.index=this.navParams.get('index') ;
       
         
        this.tour.items[this.index]  =this.Monum .find(
          val=>{
            return val.name == f.value.selected ;
          }
        ) ;

      }
}
