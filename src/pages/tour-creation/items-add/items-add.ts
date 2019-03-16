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
   Monum:Items[] ;
   tour:Tours ;
   addBut=false ;
   finishBut=false ;
   index:number ;
   img:string ='' ;
   audio:'' ;
   
  constructor(  private alertCtrl :AlertController,private MuseumService :MuseumsService,public toastCtrl :ToastController ,public camera: Camera  ,public navCtrl: NavController, public navParams: NavParams , public avMon:availableMonuments ,public TourSer :
    ToursService ,private transfer: FileTransfer, private file: File ,public modalCtrl :ModalController) {
  }
finish() {
this.finishBut=true ;

}
add() {
  this.addBut=true ;
}
  ionViewWillEnter() {
    //this.Monum = this.avMon.getItems() ;
    
    this.Monum =(this.MuseumService.getMuseum().find(museum=>{
    return museum.name ==(<Tours>this.navParams.get('tour')).name; ;
    }
      
    )).items ;
    
   
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
 
  onSubmit(f:NgForm) {
    this.tour =this.navParams.get('tour');
    this.index=this.navParams.get('index') ;
   
     
    this.tour.items[this.index]  =this.Monum .find(
      val=>{
        return val.name == f.value.selected ;
      }
    ) ;
    this.tour.items[this.index].addedInfo =f.value.txt ;
    this.tour.items[this.index].imgUrl =this.img ;
    this.tour.items[this.index].audio =this.audio ;
    this.tour.items[this.index].sequenceNum =f.value.seqNum ;
    this.tour.items[this.index].Time =f.value.dur ;
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpeg',
      headers: {}
     
   }
   /*
   fileTransfer.upload(this.img,'',options).then(data=>{
     console.log('success:' + data) ;
   }
    
   ).catch((err)=>
   {alert("error"+JSON.stringify(err));}); */
   
    if(this.addBut){ 
      this.navCtrl.push(ItemsAddPage ,{'tour':this.tour ,'index':++this.index})

    }
   
    if(this.finishBut){
      console.log('submit finish button') ;
      
      this.TourSer.addTour(this.tour) ;
      this.navCtrl.setRoot(TabsPage) ;
    }
     
   
    
  }
  Record(){
const modal = this.modalCtrl.create(AudioPage) ;
 modal.present();
 modal.onDidDismiss(audio=>{
   console.log("nothing was returned" +audio) ;
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
            this.navCtrl.setRoot(TabsPage) ;
          }
        }
        
      ]
    });
    confirm.present();
  }

}
