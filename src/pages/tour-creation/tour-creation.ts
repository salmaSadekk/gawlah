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
  constructor(private loadingCtrl:LoadingController, private transfer :FileTransfer,private authservice :AuthService,public toastCtrl :ToastController 
    ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams , public MuseumService :MuseumsService) {
  }
  ionViewWillEnter() {
    this.museums = this.MuseumService.getMuseum()  ;
   
  }

  onSubmit(f :NgForm) {
    let name = f.value.name ;
  this.tour.name= f.value.name ;
  this.tour.TourName   =f.value.TourName ;
  this.tour.theme = f.value.theme ;
  this.tour.duration =f.value.dur;
  this.tour.mainImage= f.value.image ;
  this.tour.TicketPrice= f.value.TicketPrice ;
  var data ={
    museum : this.tour.name ,
    tourname : this.tour.TourName  ,
    ticketprice :this.tour.TicketPrice ,
    theme:this.tour.theme  ,
    file : f.value.image

  }
     // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
  this.authservice.SendData( data , 'http://192.168.1.4/android_login_api/Tour_creation.php').then(res=>
   { console.log('sendData 1 :' +res) ;
   /*
   let dataFromServer = JSON.parse(res.data) ;
   console.log('msg1'+dataFromServer.msg1) ;
   console.log('msg2'+dataFromServer.msg2) ;
   console.log('msg3'+dataFromServer.msg3) ;
   console.log('msg4' +dataFromServer.msg4) ; */
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

fileTransfer.upload(imageData, 'http://192.168.1.4/android_login_api/Tour_creation.php', options1)
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
 });


 


  }  /*
uploadFile() {
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
    fileKey: 'ionicfile',
    fileName: 'ionicfile',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }

  fileTransfer.upload(this.img, 'http://192.168.0.7:8080/api/uploadImage', options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
    //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    loader.dismiss();
    //this.presentToast("Image uploaded successfully");
  }, (err) => {
    console.log(err);
    loader.dismiss();
   // this.presentToast(err);
  });
} */
  }
  

