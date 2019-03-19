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
  tour :Tours = new Tours('','','','','','','','',[],[],0) ;
  img:string='' ;
  museums:Museum[] =[];
  constructor(private currentUser :CurrentUser,private loadingCtrl:LoadingController, private transfer :FileTransfer,private authservice :AuthService,public toastCtrl :ToastController 
    ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams , public MuseumService :MuseumsService) {
  }
  ionViewWillEnter() {
   // this.ItemsRetrieve() ;
   this.museums = this.MuseumService.getMuseum()  ;
   
  }

  onSubmit(f :NgForm) {
    let name = f.value.name ;
  this.tour.name= f.value.name ;
  this.tour.TourName   =f.value.TourName ;
  this.tour.theme = f.value.theme ;
  this.tour.duration =f.value.dur;
  this.tour.CreatorImg = this.currentUser.getUser().profilePic ;
  //this.tour.mainImage= f.value.image ;
  this.tour.mainImage= this.img ;
  this.tour.TicketPrice= f.value.TicketPrice ;
  var data ={
    museum : this.tour.name ,
    tourname : this.tour.TourName  ,
    ticketprice :this.tour.TicketPrice ,
    theme:this.tour.theme  

  }
     // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
  this.authservice.SendData( data , 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php').then(res=>
   { console.log('sendData 1 :' +res) ;
   
   let dataFromServer = JSON.parse(res.data) ;
   this.tour.uid = dataFromServer.tour_id ;
   console.log('username' + dataFromServer.username) ;
   console.log('msg1'+dataFromServer.tour_id) ;
   console.log('msg1'+dataFromServer.msg1) ;
   console.log('msg2'+dataFromServer.msg2) ;
   console.log('msg3'+dataFromServer.msg3) ;
   console.log('msg4' +dataFromServer.msg4) ;
  this.fileTransfer(this.img ) ;
   }
  ).catch(error=>
    console.log(error)) ;

  
 
   this.navCtrl.push(ItemsAddPage , {'tour':this.tour ,'index':0}) ;
  }
  Camera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE ,
      sourceType:0
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
    console.log('in File Transfer 2')
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      
       fileKey: 'file',
       fileName: 'name',
       headers: {}
    
    }

fileTransfer.upload(imageData, 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php', options1)
 .then((data) => {

  console.log(data.headers) ;
  console.log(data.bytesSent) ;
  console.log(data.response) ;
  console.log(data.responseCode) ;
console.log(data) ;

   alert("success");
 }, (err) => {
   // error
   alert("error"+JSON.stringify(err));
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



  }
  

