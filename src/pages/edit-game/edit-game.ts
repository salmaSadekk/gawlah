import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Tours } from '../../Models/Tours';
import { game_Items } from '../../Models/game_items';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';

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
  removed:string[]=[] ;
  img ='' ;

  


  constructor( private transfer: FileTransfer , private toastCtrl :ToastController , private camera :Camera, private actionSheetCtrl :ActionSheetController,private alertCtrl :AlertController,private authService :AuthService,public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGamePage');
  }
  ngOnInit() {
   //console.log('salomIs testing')
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
    this.tour.items =[] ;
      for(var i =0 ;i<dataFromServer.length ;i++) {
       

        questions.push(new game_Items(dataFromServer[i].name,dataFromServer[i].image,dataFromServer[i].item_id,dataFromServer[i].question , dataFromServer[i].choices.split(',')  ,
         dataFromServer[i].correct_answer , dataFromServer[i].did_you_know ,dataFromServer[i].question_id  )) ;
      }
     
      console.log("testX" + questions[0].choices.toString())
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
    if(this.tour.items[ItemIndex].arr[QuestionIndex].choices.length==1 && choiceIndex!=-2){
      {
        const prompt = this.alertCtrl.create({
          title: 'error',
          message: "options shouldn't be less than 1",
        
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        prompt.present();
      }
    } else{
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
           else  {
          
            this.tour.items[ItemIndex].arr[QuestionIndex].choices.splice(choiceIndex ,1) ;
          
  
  
            
  
           }
          
            }
          }
          
        ]
      });
      confirm.present();
  
    }
   
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
 this.removed.push(this.tour.items[ItemIndex].arr[QuestionIndex].question_id ) ;
  
 
  if(this.tour.items[ItemIndex].arr.length==1) {
    this.tour.items.splice(ItemIndex,1) ;
  } else{
    this.tour.items[ItemIndex].arr.splice(QuestionIndex ,1 ) ;
  }
  
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
          this.tour.items[ItemIndex].arr[QuestionIndex].choices.push(data.choice) ;
        
        }
      }
    ]
  });
  prompt.present();

}
onDone() {
  /* 
 for(var i=0 ;i<this.tour.items.length ;i++) {
   for(var j=0 ;j<this.tour.items[i].length ; j++) {
     var x = this.tour.items[i].arr[j].choices ;
     console.log('in' +x.toString) ;
    
    this.tour.items[i].arr[j].choices=(x.toString()).substring(1,x.length-1) ;
    console.log('insss' +this.tour.items[i].arr[j].choices.toString()) ;
   }
 } */
 var Questions = [] ;
 for(var i =0 ; i<this.tour.items.length ;i++) {
   console.log('test1')
   var item =this.tour.items[i] ;
 var arr =item.arr;
     for(var m=0;m<arr.length ;m++) {
      console.log('test3') ;
      
      arr[m].uid =arr[m].choices.toString() ;
      arr[m].correctAns = arr[m].correctAns.toString()
      
      Questions.push(arr[m]) ;
     }
   
 }
 console.log('rrr' + JSON.stringify(Questions)  ) ;
    
    
   let url = this.authService.edit_game ;
   this.authService.SendData({
     game_id :this.tour. uid ,
     name : this.tour.TourName ,
     theme :this.tour.theme ,
     tour_info : this.tour.tour_info  ,
     items: Questions ,
     removed :this.removed
   } , url).then(res=>
    {
      console.log(res.data) ;
      console.log(res.error) ;
      console.log(res.headers) ;
      console.log(res.status) ;
      console.log(res.url) ;
    }) ;
    if(this.img!='' ) {
      this.fileTransfer(this.img) ;
    }
  }
  fileTransfer(imageData) {
    
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions= {
      
       fileKey: 'image',
       fileName: 'name',
       headers: {}
    
    }
    var params = {
      Tour_id : this.tour.uid
    };
   
    

	options1.params = params;
    let url = this.authService.edit_game ;
fileTransfer.upload(imageData, url, options1)
 .then((data) => {
console.log(data.bytesSent) ;
console.log(data.headers) ;
console.log(data.response) ;
console.log(data.responseCode) ;
 }, (err) => {
   // error
  // alert("error"+JSON.stringify(err));
   console.log(JSON.stringify(err)) ;
 });


 


  } 
  edit(type) {
    const prompt = this.alertCtrl.create({
      title: 'Added Info',
      message: "Edit the added Information",
      inputs: [
        {
          name: '' +type,
          placeholder: '' +type
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
           
            switch(type) {
              case 'TourName' : this.tour.TourName = data.TourName  ;break ;
              case 'theme' : this.tour.theme =data.theme ;break ;
              case 'tour_info' : this.tour.tour_info =data.tour_info ; break ;
              case 'TicketPrice' : this.tour.TicketPrice =data.TicketPrice ;break ;
            }
       
          }
        }
      ]
    });
    prompt.present();
    
 
  }
 
  Camera(source){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE ,
      sourceType:source
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.img= 'data:image/jpeg;base64,' + imageData;
     this.tour.mainImage = this.img ;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
  
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }
  presentActionSheet() {
    
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add a picture',
      buttons: [
        {
          text: 'Camera',
          
          handler: () => {
            console.log('Destructive clicked');
            this. Camera(1 ) ;
          }
        },{
          text: 'from gallery',
         
          handler: () => {
            this. Camera(0 ) ;
          } },
          {
            text: 'cancel',
            role :'cancel',
           
            handler: () => {
            console.log('cancelled')
            }
        }
      ]
    });
    actionSheet.present();
  }
  
}
