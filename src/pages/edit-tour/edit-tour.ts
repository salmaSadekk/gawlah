import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { Items } from '../../Models/Items';
import { Tours } from '../../Models/Tours';
import { AuthService } from '../../services/auth';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { CaptureVideoOptions, MediaFile, CaptureError, MediaCapture } from '@ionic-native/media-capture';
import { AudioPage } from '../tour-creation/items-add/audio/audio';
import { Media } from '@ionic-native/media';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';

/**
 * Generated class for the EditTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-tour',
  templateUrl: 'edit-tour.html',
})
export class EditTourPage implements OnInit {
 
  items : Items[] =[] ;
  video: {item_id : string , Url: string}[] =[] ;
  audio: {item_id : string , Url: string}[] =[] ;
  image : {item_id : string , Url: string}[] =[] ; 
  addedInfo :   {item_id : string , addedInfo: string}[] =[] ; 
  constructor( private media: Media,private transfer: FileTransfer ,private mediaCapture: MediaCapture , public alertCtrl :AlertController,public actionSheetCtrl :  ActionSheetController,public toastCtrl :ToastController ,public camera: Camera ,public navCtrl: NavController, public navParams: NavParams , private authService :AuthService  ,public modalCtrl :ModalController) {
  }
  ngOnInit() {
   var tour = this.navParams.get('tour') ;
   var data = {
    tour_id:tour.uid
  }
  let url = this.authService.get_tour_items ;
  this.authService.SendData(data ,url).then(
    res=>{
      console.log('data :'+ res.data) ;
   let dataFromServer = JSON.parse(res.data) ; 
   
    for(var i =0 ;i<dataFromServer.length ;i++) {
     // var   base64Data= dataFromServer[i].image;
     // var converted_image= "data:image/jpeg;base64,"+base64Data;
     // console.log('the image :'+ converted_image) ;

      this.items.push(new Items(dataFromServer[i].item_id, dataFromServer[i].name , dataFromServer[i].image , dataFromServer[i].basic_info ,
      dataFromServer[i].added_info ,dataFromServer[i].audio,dataFromServer[i].video , dataFromServer[i].sequence ,-1 , '')) ;
      
    }
  }) }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTourPage');
  }
  presentActionSheet(uid , i) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add a picture',
      buttons: [
        {
          text: 'Camera',
          
          handler: () => {
            console.log('Destructive clicked');
            this. Camera(1 , uid , i) ;
          }
        },{
          text: 'from gallery',
         
          handler: () => {
            this. Camera(0 , uid , i) ;
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
  onListen(audioUrl){
  
     let audio = this.media.create(audioUrl);
  
  audio.play();
  audio.setVolume(0.8);
  }
  Camera(source , uid , i){
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
    var img= 'data:image/jpeg;base64,' + imageData;
     this.image.push({item_id:uid ,Url : img }) ;
     this.items[i].imgUrl = img ;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
  
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }
  editAddedInfo(uid ,i) {
    
      const prompt = this.alertCtrl.create({
        title: 'Added Info',
        message: "Edit the added Information",
        inputs: [
          {
            name: 'Info',
            placeholder: 'Info'
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
            
             this.items[i].addedInfo = data.Info ;
             console.log('choice' +data.Choice) ;
            }
          }
        ]
      });
      prompt.present();
      console.log('daata from prompt' +prompt.data) ;
    
  }
  videoCapture(uid , i) {
  
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {console.log(data[0].fullPath) ;
        //this.video= data[0].fullPath ; 
      this.video.push({item_id : uid ,Url : data[0].fullPath } ) ;
      this.items[i].audio=  data[0].fullPath ; },
        (err: CaptureError) => console.error(err)
      );
     

  }
  onDone() {
    
   
    
    console.log('the length of the images array' + this.image) ;
    if(this.image.length >0  ) {
      this.fileTransfer(this.image[0] , 'image') ;
    }else if (this.audio.length >0 ) {
      this.fileTransfer(this.audio[0] , 'audio') ;
    }else if(this.video.length >0) {
      this.fileTransfer(this.video[0] , 'video') ;
    }
    
    
  }
  Record(uid , i){
const modal = this.modalCtrl.create(AudioPage) ;
 modal.present();
 modal.onDidDismiss((audio:string)=>{
  this.audio.push({item_id : uid ,Url : audio}) ;
  this.items[i].audio= audio;
  
  
 }

 )
  }
  fileTransfer(imageData ,type) {
    console.log('in File Transfer 2')
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      
       fileKey: type,
       fileName: 'name',
       headers: {}
    
    }
    var uid= this.navParams.get('tour').uid ;
    var params = {
      Tour_id : uid , 
      item_id : imageData.item_id 
    };
   
    

	options1.params = params;
    let url = this.authService.edit_tour ;
    


fileTransfer.upload(imageData.Url, url, options1)
 .then((data) => {
console.log('after the attempt LOL') ;
console.log(data.bytesSent) ;
console.log(data.headers) ;
console.log(data.response) ;
console.log(data.responseCode) ;
 if(type=='image') {
   this.image.splice(0,1) ;
   if(this.image.length>0 ) {
     this.fileTransfer(this.image[0] , 'image') ;
   }
 } else  if(type=='audio'||type=='image') {
   if(type== 'audio')
  this.audio.splice(0,1) ;
  if(this.audio.length>0 ) {
    this.fileTransfer(this.audio[0] , 'audio') ;
  }
}
else {
  if(type== 'video')
  this.video.splice(0,1) ;
  if(this.video.length>0 ) {
    this.fileTransfer(this.video[0] , 'video') ;
  }
}
  

   alert("success");
 /*  if(this.audio!='' && this.flag) {
    this.flag = false ;
   
    this.fileTransfer(this.audio ,'audio') ;
  
   }
   if(this.video!='' && this.flagVideo) {
    this.flagVideo = false ;
   this.fileTransfer(this.video ,'video') ;
   
   }*/
  
   
 }, (err) => {
   // error
   alert("error"+JSON.stringify(err));
 });


 


  }  
 

}
