import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Tours } from '../../Models/Tours';
import { ItemsAddPage } from './items-add/items-add';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MuseumsService } from '../../services/AvailableMuseums';
import { Museum } from '../../Models/Museum';
import { AuthService } from '../../services/auth';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer, FileUploadOptions} from '@ionic-native/file-transfer';
import { CurrentUser } from '../../services/CurrentUser';
import { ActionSheetController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the TourCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour-creation',
  templateUrl: 'tour-creation.html',
})
export class TourCreationPage {
  tour :Tours = new Tours('','','','','','','','',[],[],0 ,'',this.currentUser.getUser().uid,0,'') ;
  img:string='' ;
  museums:Museum[] =[];
  constructor(public actionSheetCtrl: ActionSheetController ,private currentUser :CurrentUser,private loadingCtrl:LoadingController, private transfer :FileTransfer,private authservice :AuthService,public toastCtrl :ToastController 
    ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams , public MuseumService :MuseumsService) {
  }
  ionViewWillEnter() {
   // this.ItemsRetrieve() ;
   //this.museums = this.MuseumService.getMuseum()  ;
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
    
  
  var museum= f.value.name ; //museum name
  this.tour.name =this.museums.find(
    Museum=>{
      return museum == Museum.name ;
    }
  ).description ;
  this.tour.TourName   =f.value.TourName ;
  this.tour.theme = f.value.theme ;
  //this.tour.duration =f.value.dur;
  this.tour.CreatorImg = this.currentUser.getUser().profilePic ;
  //this.tour.mainImage= f.value.image ;
  this.tour.mainImage= this.img ;
  this.tour.TicketPrice= f.value.TicketPrice ;
  var data ={
    museum : museum,
    tourname : this.tour.TourName  ,
    ticketprice :this.tour.TicketPrice ,
    theme:this.tour.theme  ,
    rating : 0 ,
    tour_info :f.value.txt

  }
  
     // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
     let url = this.authservice.tourCreationUrl ;
  this.authservice.SendData( data ,url).then(res=>
   { 
     console.log('tour-Creation') ;
     console.log(res.data) ;
     console.log(res.url) ;
     console.log(res.headers) ;
     console.log(res.error) ;
     console.log(res.status) ;   
   let dataFromServer = JSON.parse(res.data) ;
   this.tour.uid = dataFromServer.tour_id ;
  
  this.fileTransfer(this.img ) ;
   }
  ).catch(error=>
    console.log(error)) ;

  
 
   this.navCtrl.push(ItemsAddPage , {'tour':this.tour ,'index':0}) ;
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
    let url = this.authservice.tourCreationUrl ;
fileTransfer.upload(imageData, url, options1)
 .then((data) => {

  

   //alert("success");
 }, (err) => {
   // error
  // alert("error"+JSON.stringify(err));
   console.log(JSON.stringify(err)) ;
 });


 


  }  
 /*ItemsRetrieve() {
   var data = {
    museum_items :'museum_items'
   }
   this.authservice.GetData('http://192.168.43.87:8000/Gawlah/backup/get_items.php' ,data).then(
     res=>{
       console.log('Items Retrival from data base :' +res.data) ;
       console.log(res.error) ;
       console.log(res.headers) ;
       console.log(res.status) ;
       console.log(res.url) ;
      
       


     //  console.log(dataFromServer.item_id) ;
      // console.log(dataFromServer.item_name) ;
     }
   )
 } */
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
  this.navCtrl.setRoot(TabsPage) ;
}



  }
  

