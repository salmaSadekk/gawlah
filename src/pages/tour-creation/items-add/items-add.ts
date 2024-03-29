import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { availableMonuments } from '../../../services/availableMonuments';
import { Items } from '../../../Models/Items';
import { NgForm } from '@angular/forms';
import { Tours } from '../../../Models/Tours';
import { TabsPage } from '../../tabs/tabs';
import { ToursService } from '../../../services/Tours';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { AudioPage } from './audio/audio';
import { File } from '@ionic-native/file';
import { MuseumsService } from '../../../services/AvailableMuseums';
import { AuthService } from '../../../services/auth';
import { MediaCapture, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { TourDetailPage } from '../../home/tour-detail/tour-detail';
import { CurrentUser } from '../../../services/CurrentUser';
/**
 * Generated class for the ItemsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-add',
  templateUrl: 'items-add.html',
})
export class ItemsAddPage {
   Monum:Items[]=[] ;
   tour:Tours ;
   addBut=false ;
   finishBut=false ;
   index:number ;
   img:string ='' ;
   audio='' ;
   video='' ;
   flagVideo =true ;
   flag=true ;
   Edit=false ;
 
   
  constructor(private mediaCapture: MediaCapture , private authservice: AuthService, private alertCtrl :AlertController,private MuseumService :MuseumsService,public toastCtrl :ToastController ,public camera: Camera  ,public navCtrl: NavController, public navParams: NavParams , public avMon:availableMonuments ,public TourSer :
    ToursService ,private transfer: FileTransfer, private file: File ,public modalCtrl :ModalController , public currentUser:CurrentUser) {
  }
finish() {
this.finishBut=true ;

}
add() {
  this.addBut=true ;
}
  ionViewWillEnter() {
    //this.Monum = this.avMon.getItems() ; 
    var item ;
    if( this.navParams.get('tour') != undefined || this.navParams.get('tour') != null){
      this.tour =this.navParams.get('tour');
      item = this.tour.name ;
    } else{
     item = this.navParams.get('museum')  ;
     console.log('from Itrms add ' +item) ;
     this.Edit =true ;
    }
   
      let url = this.authservice.get_items ;
//console.log('the museum id from game items add' + this.tour.name) ;
     this.authservice.SendData({item:item} , url).then(
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
  
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }
  onSubmit2(f:NgForm) {
  
   
    var index =this.Monum .find(
      val=>{
        return val.name == f.value.selected ;
      }
    ) ;
    var data ={
      addedInfo : f.value.txt,
      sequenceNum : f.value.seqNum ,
      duration :f.value.dur    ,
      item_id: index.uid 
      
   
  
    }
       // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
       let url = this.authservice.tour_items ;
    this.authservice.SendData( data , url).then(res=>
     { 
     
     let dataFromServer = JSON.parse(res.data) ;
    
     this.fileTransfer(this.img ,'image' ) ;
     }
    ).catch(error=>
      console.log(error))  ;
    
    
   console.log("onSubmit 2") ;
    this.navCtrl.pop() ;
     
   
  }
 
  onSubmit(f:NgForm) {
    if(this.navParams.get('museum') !=null || this.navParams.get('museum')!=undefined){
     this. onSubmit2(f) ;
     return ;

    }
    
    this.index=this.navParams.get('index') ;
   
     
    this.tour.items[this.index]  =this.Monum .find(
      val=>{
        return val.name == f.value.selected ;
      }
    ) ;
    this.tour.items[this.index].addedInfo =f.value.txt ;
    this.tour.items[this.index].imgUrl =this.img ;
    this.tour.items[this.index].video = this.video ;
    console.log('the video X' +  this.video) ;
    this.tour.items[this.index].audio =this.audio ;
    this.tour.items[this.index].sequenceNum =f.value.seqNum ;
    this.tour.items[this.index].Time =f.value.dur ;
    const item =this.tour.items[this.index];
    var data ={
      addedInfo : item.addedInfo,
      sequenceNum : item.sequenceNum ,
      duration :item.Time   ,
      item_id: item.uid 
      
   
  
    }
       // 'http://192.168.43.87:8000/Gawlah/backup/Tour_creation.php'
       let url = this.authservice.tour_items ;
    this.authservice.SendData( data , url).then(res=>
     { console.log('sendData items-add :' +res.data) ;
     console.log(res.error) ;
     console.log(res.headers) ;
     console.log(res.status) ;
     console.log(res.url) ;
     
     let dataFromServer = JSON.parse(res.data) ;
     console.log("items-add from database seqnum :" +dataFromServer.sequence) ;
     console.log("items-add from database seqnum :" +dataFromServer.tourid) ;
     console.log(this.tour.uid) ;
     console.log('image Path in fileTransfer : ' +this.img)
     this.fileTransfer(this.img ,'image' ) ;
     }
    ).catch(error=>
      console.log(error))  ;
    
    
   
    if(this.addBut){ 
      this.navCtrl.push(ItemsAddPage ,{'tour':this.tour ,'index':++this.index})

    }
   
    if(this.finishBut){
      console.log('submit finish button') ;
      let url = this.authservice.extra ;
    let  data={
     update_score :true ,
     user_id :this.currentUser.getUser().uid
      }
      this.authservice.SendData( data , url).then(res=>{
        alert("your score got updated");
      })
    
      
      //this.TourSer.addTour(this.tour) ;
      this.navCtrl.setRoot(TourDetailPage ,{TourDisplay : this.tour}) ;
    }
     
   
    
  }
  fileTransfer(imageData ,type) {
    console.log('in File Transfer 2')
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      
       fileKey: type,
       fileName: 'name',
       headers: {}
    
    }
    let url = this.authservice.tour_items ;

fileTransfer.upload(imageData, url, options1)
 .then((data) => {

  

   //alert("success");
   if(this.audio!='' && this.flag) {
    this.flag = false ;
   
    this.fileTransfer(this.audio ,'audio') ;
  
   }
   if(this.video!='' && this.flagVideo) {
    this.flagVideo = false ;
   this.fileTransfer(this.video ,'video') ;
   
   }
  
   
 }, (err) => {
   // error
   alert("error"+JSON.stringify(err));
 });


 


  }  
 
  videoCapture() {
  
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {console.log(data[0].fullPath) ;
        this.video= data[0].fullPath ; },
        (err: CaptureError) => console.error(err)
      );
  }
  Record(){
const modal = this.modalCtrl.create(AudioPage) ;
 modal.present();
 modal.onDidDismiss((audio:string)=>{
  
   this.audio =audio ;
 }

 )
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
            if(this.Edit) {
              this.navCtrl.pop() ;
            } else{
              let url = this.authservice.deleteTour ;
              this.authservice.SendData({tour_id:this.tour.uid} , url) .then(
                res=>{
                  console.log(res.error) ;
                  console.log(res.status) ;
                  console.log(res.data) ;
                  //this.ownTours.splice(i ,1) ;
                  this.navCtrl.setRoot(TabsPage) ;
                }
              )
            }
           
          }
        }
        
      ]
    });
    confirm.present();
  }
  

}
