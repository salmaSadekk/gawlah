import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { MuseumsService } from '../../services/AvailableMuseums';
import { Museum } from '../../Models/Museum';
import { NgForm } from '@angular/forms';
import { Tours } from '../../Models/Tours';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { CurrentUser } from '../../services/CurrentUser';
import { AuthService } from '../../services/auth';
import { GameItemsaddPage } from './game-itemsadd/game-itemsadd';



@IonicPage()
@Component({
  selector: 'page-gamecreation',
  templateUrl: 'gamecreation.html',
})
export class GamecreationPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  ///////////////////////////////////////////
 


handleAnimation(anim: any) {
this.anim = anim;
}

stop() {
this.anim.stop();
}

play() {
this.anim.play();
}

pause() {
this.anim.pause();
}

setSpeed(speed: number) {
this.animationSpeed = speed;
this.anim.setSpeed(speed);
}





  ///////////////////////////////////////////////////
 first =true ;
  tour :Tours = new Tours('','','','','','','','',[],[],0,'','',0,'') ;
  img:string='' ;
  museums:Museum[] =[];
  constructor(public actionSheetCtrl: ActionSheetController ,private currentUser :CurrentUser,private loadingCtrl:LoadingController, private transfer :FileTransfer,private authservice :AuthService,public toastCtrl :ToastController 
    ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams , public MuseumService :MuseumsService) {
  
      this.lottieConfig = {
        path: 'assets/animations/trophy.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
    };
  
    }
  ionViewWillEnter() {
  
  
   let url = this.authservice.get_museums ;
   this.authservice.SendData({museum_items:'s'} ,url).then(
     res=>{
      let dataFromServer = JSON.parse(res.data) ; 
      
      for(var i=0 ;i<dataFromServer.length ; i++) {
        
this.museums.push(new Museum(dataFromServer[i].museum_name , dataFromServer[i].museum_id,[])) ;
      }

     }
   );
   
  }

  onSubmit(f :NgForm) {
  
  this.tour.name= f.value.name ; //museum name
  this.tour.name =this.museums.find(
    museum=>{
      return this.tour.name == museum.name ;
    }
  ).description ;
  this.tour.TourName   =f.value.GameName ;
  this.tour.theme = f.value.theme ;
  //this.tour.duration =f.value.txt; //the description
  this.tour.tour_info = f.value.txt ;
  this.tour.CreatorImg = this.currentUser.getUser().profilePic ;
   this.tour.mainImage= this.img ;
  
  var data ={ 
    gamename : this.tour.TourName   ,
    game_info:this.tour.tour_info  ,
    museum : this.tour.name ,
    image : this.img ,
    theme :this.tour.theme ,
    rating :0 ,
    user_id : this.currentUser.getUser().uid
    
   

  }
  console.log('the game creation :'+JSON.stringify(data))
     
     let url = this.authservice.game_creation ;
  this.authservice.SendData( data ,url).then(res=>
   { 
   console.log(res.data) ;
   console.log(res.error) ;
   console.log(res.headers) ;
   console.log(res.status) ;
   console.log(res.url) ;
   let dataFromServer = JSON.parse(res.data) ;
   this.tour.uid = dataFromServer.msg5 ;
   console.log( 'From game Creation id' +this.tour.uid) ;
  
  this.fileTransfer(this.img ) ;
   }
  ).catch(error=>
    console.log(error)) ;

  
 
   this.navCtrl.push(GameItemsaddPage , {'tour':this.tour ,'index':0}) ;
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
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     //this.fileTransfer(base64Image) ;
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  } 


  fileTransfer(imageData) {
    
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      
       fileKey: 'file',
       fileName: 'name',
       headers: {}
    
    }
    let url = this.authservice.game_creation ;
fileTransfer.upload(imageData, url, options1)
 .then((data) => {
console.log(data.bytesSent) ;
console.log(data.headers) ;
console.log(data.response) ;
console.log(data.responseCode) ;
  

   alert("success");
 }, (err) => {
   // error
  // alert("error"+JSON.stringify(err));
   console.log(JSON.stringify(err)) ;
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
          this. Camera(1) ;
        }
      },{
        text: 'from gallery',
       
        handler: () => {
          this. Camera(0) ;
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

cancel(){
  this.navCtrl.popToRoot() ;
}

  }
  
