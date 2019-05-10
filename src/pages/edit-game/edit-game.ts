import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  changes : game_Items[]= [] ;


  constructor(private alertCtrl :AlertController,private authService :AuthService,public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGamePage');
  }
  ngOnInit() {
    this.tour = this.navParams.get('game') ;
    console.log(this.tour) ;
    console.log(this.tour.TourName) ;
    var data = {
      game_id:this.tour.uid
    }
    let url = this.authService.get_game_questions ;
    this.authService.SendData(data ,url).then(
      res=>{
        console.log(res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url) ;
        console.log('data :'+ res.data) ;
        console.log(res.data) ;
     let dataFromServer = JSON.parse(res.data) ; 
    var questions : game_Items []=[] ;
      for(var i =0 ;i<dataFromServer.length ;i++) {
       

        questions.push(new game_Items(dataFromServer[i].name,dataFromServer[i].image,dataFromServer[i].item_id,dataFromServer[i].question , dataFromServer[i].choices.split(',')  ,
         dataFromServer[i].correct_answer , dataFromServer[i].did_you_know ,dataFromServer[i].question_id  )) ;
      }
      if(questions.length>0){
           var item =questions.splice(0 ,1) ;
    
      this.tour.items.push({name:item[0].name , arr :[item[0]]}) ;
      
     for(var i =0 ;i<questions.length;){
       var itemval =questions.splice(i,1) ;
       var val =this.tour.items.findIndex(
         item=>{
           
           return item.name ==itemval[0].name
         }
       )
       if(val ==-1){
      
         var x = this.tour.items.push({name:itemval[0].name , arr :[itemval[0]]}) ;
         console.log('val=-1 ::' + x) ;
        }
        else{
         
          this.tour.items[val].arr.push(itemval[0]) ;
         
        }
     }
     
    
   
        
      } 
     });
   
   
  
  console.log("at ngOninit" + this.tour.items.toString) ;
  
  }
  delete(ItemIndex , QuestionIndex , choiceIndex) {
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
       
         
        if(choiceIndex==-1)
         this.tour.items[ItemIndex].arr[QuestionIndex].correctAns ="";
         else if(choiceIndex==-2)
         this.tour.items[ItemIndex].arr[QuestionIndex].didYouKnow ="";
         else 
         this.tour.items[ItemIndex].arr[QuestionIndex].choices.splice(choiceIndex ,1) ;
          }
        }
        
      ]
    });
    confirm.present();

  }
EditAnswer(ItemIndex ,QuestionIndex ,choiceIndex){
  const prompt = this.alertCtrl.create({
    title: 'Edit Choice',
    message: "Edit this choice",
    inputs: [
      {
        name: 'choice',
        placeholder: 'choice'
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
          if(choiceIndex!= -1)
          this.tour.items[ItemIndex].arr[QuestionIndex].choices[choiceIndex] =data.choice ;
          else
          this.tour.items[ItemIndex].arr[QuestionIndex].correctAns = data.choice ;
        
        }
      }
    ]
  });
  prompt.present();
  console.log('daata from prompt' +prompt.data) ;

}
changeAnswer(ItemIndex ,QuestionIndex ,choiceIndex) {
  var x = this.tour.items[ItemIndex].arr[QuestionIndex] ;
 x.choices.push(x.correctAns) ;
 x.correctAns=x.choices.splice(choiceIndex,1) ;


}
Removequestion(ItemIndex ,QuestionIndex) {
  this.tour.items[ItemIndex].arr.splice(QuestionIndex ,1 ) ;
}
addOption(ItemIndex ,QuestionIndex){
  const prompt = this.alertCtrl.create({
    title: 'Edit Choice',
    message: "Edit this choice",
    inputs: [
      {
        name: 'choice',
        placeholder: 'choice'
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
          this.tour.items[ItemIndex].arr[QuestionIndex].choices.push(data.Info) ;
        
        }
      }
    ]
  });
  prompt.present();

}
}
