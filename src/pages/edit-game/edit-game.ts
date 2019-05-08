import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Tours } from '../../Models/Tours';
import { game_Items } from '../../Models/game_items';

/**
 * Generated class for the EditGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-game',
  templateUrl: 'edit-game.html',
})
export class EditGamePage  implements OnInit{
  tour:Tours;

  constructor(private authService :AuthService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGamePage');
  }
  ngOnInit() {
    this.tour = this.navParams.get('game') ;
    var data = {
      game_id:this.tour.uid
    }
    let url = this.authService.get_game_questions ;
    this.authService.SendData(data ,url).then(
      res=>{
        console.log('data :'+ res.data) ;
     let dataFromServer = JSON.parse(res.data) ; 
    var questions : game_Items []=[] ;
      for(var i =0 ;i<dataFromServer.length ;i++) {
       

        questions.push(new game_Items(dataFromServer[i].name,dataFromServer[i].image,dataFromServer[i].item_id,dataFromServer[i].question , dataFromServer[i].choices ,
         dataFromServer[i].correct_answer , dataFromServer[i].did_you_know )) ;
      }
      if(questions.length>0){
           var item =questions.splice(0 ,1) ;
    
      this.tour.items.push({name:item[0].name , arr :[item]}) ;
      
     for(var i =0 ;i<questions.length;){
       var itemval =questions.splice(i,1) ;
       var val =this.tour.items.findIndex(
         item=>{
           
           return item.name ==itemval[0].name
         }
       )
       if(val ==-1){
      
         var x = this.tour.items.push({name:itemval[0].name , arr :[itemval]}) ;
         console.log('val=-1 ::' + x) ;
        }
        else{
         
          this.tour.items[val].arr.push(itemval) ;
         
        }
     }
     
    
   
        
      } 
     });
   
   
  
  
  
  }
}
