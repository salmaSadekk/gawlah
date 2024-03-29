import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController, NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { User } from '../../Models/user';
import { CurrentUser } from '../../services/CurrentUser';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { Notif } from '../../services/notif';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
 first =true ;
 second=false ;
 third =false ;
 img ='' ;
 constructor ( private notification :Notif,private oneSignal: OneSignal , private storage :Storage, private currentUser :CurrentUser,private transfer :FileTransfer, private authservice :AuthService, private toastCtrl :ToastController,public camera: Camera  ,private authService :AuthService ,
  private loading :LoadingController ,private alertCtrl :AlertController ,private navCtrl :NavController) {

  }


  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Change Image ?',
      message: 'Do you agree to change the default profile image?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.fileTransfer(this.img)  ;
            this.currentUser.updateImg(this.img)
            
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }




  onSubmit(f:NgForm){
    
    
    
    let loader = this.loading.create({
    
    content: 'Please wait a moment',
    
    });
    
    loader.present() ;
    var data = {
      email : f.value.email,
      password: f.value.password ,
      username: f.value.name ,
      role:'user' ,
      age: f.value.age ,
      lang: ''+f.value.selectLang
    } ;
      
    console.log('selected lang'+ typeof(f.value.selectLang)+ '..lang :') ;
    
    this.authService.SignUp(data
     )
    .then(res => {
      let dataFromServer = JSON.parse(res.data) ;
     /* this.currentUser.setUser( new User(dataFromServer.user_id , dataFromServer.username , dataFromServer.profileImg) ) ;
      this.storage.set('uid' , dataFromServer.user_id ) ;
      this.storage.set('name' , dataFromServer.username) ;
      this.storage.set('profileImg' , dataFromServer.profileImg) ;  */
      let userData =new User(dataFromServer.user_id , dataFromServer.username , dataFromServer.profileImg) ;
      this.currentUser.setUser( userData) ;
      this.storage.set('data' ,userData) ;
      //this.storage.set('followingOnly' , false) ; 
      this.oneSignal.startInit('e2d3c118-911c-4403-851d-4ae46680b74f', '122286071455');
      this.oneSignal.sendTag("user_id", dataFromServer.user_id) ;
      this.oneSignal.handleNotificationReceived().subscribe(data =>
        {  console.log(data.payload) ;
          this.notification.notifications.push( data.payload.body ) ;
        }
        );
      this.oneSignal.endInit();
  
    loader.dismiss() ; 
    
   console.log("data error from php" +res.data.error) ;
    if(dataFromServer.error==false){
      this.second =false ;
      this.third = true ;
    console.log(res.data);
    
   
    
    }else
    
    {
      
    
    let alert = this.alertCtrl.create({
    
    title:'Error',
    
    subTitle:dataFromServer.msg,
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }
    
    });
    
  
    
    }  
    fileTransfer(imageData) {
    
      const fileTransfer: FileTransferObject = this.transfer.create();
  
      let options1: FileUploadOptions = {
        
         fileKey: 'file',
         fileName: 'name',
         headers: {}
      
      }
     
     let url = this.authservice.ProfilePicUpload ;
  fileTransfer.upload(this.img, url, options1)
   .then((data) => {
  console.log(data.bytesSent) ;
  console.log(data.headers) ;
  console.log(data.response) ;
  console.log(data.responseCode) ;
  this.navCtrl.push(TabsPage) ;
    
  
     
   }, (err) => {
     // error
    // alert("error"+JSON.stringify(err));
     console.log(JSON.stringify(err)) ;
   });
  
  
   
  
  
    } 
    Camera(source){
      console.log('from Camera :' +source) ;
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
      // this.fileTransfer(base64Image) ;
     this. showConfirm()  ;
      this.alertCtrl.create(

      )
      }, (err) => {
        const toast = this.toastCtrl.create({
          message: err,
          duration: 3000
        });
        toast.present();
      });
    } 
    completeSignUp() {
      let alert = this.alertCtrl.create({
    
        title:'Registration successfull',
        subTitle:'your account has been created successfully',
       
        
        buttons: ['OK']
        
        });
        
        alert.present();
        this.navCtrl.setRoot(TabsPage) ;
        
        console.log("you entered") ;
    }
    skip() {
      this.navCtrl.setRoot(TabsPage) ;
    }
    languages =['Abkhaz'
    ,'Afar'
    ,'Afrikaans'
    ,'Akan'
    ,'Albanian'
    ,'Amharic'
    ,'Arabic'
    ,'Aragonese'
    ,'Armenian'
    ,'Assamese'
    ,'Avaric'
    ,'Avestan'
    ,'Aymara'
    ,'Azerbaijani'
    ,'Bambara'
    ,'Bashkir'
    ,'Basque'
    ,'Belarusian'
    ,'Bengali'
    ,'Bihari'
    ,'Bislama'
    ,'Bosnian'
    ,'Breton'
    ,'Bulgarian'
    ,'Burmese'
    ,'Catalan; Valencian'
    ,'Chamorro'
    ,'Chechen'
    ,'Chichewa; Chewa; Nyanja'
    ,'Chinese'
    ,'Chuvash'
    ,'Cornish'
    ,'Corsican'
    ,'Cree'
    ,'Croatian'
    ,'Czech'
    ,'Danish'
    ,'Divehi; Dhivehi; Maldivian;'
    ,'Dutch'
    ,'English'
    ,'Esperanto'
    ,'Estonian'
    ,'Ewe'
    ,'Faroese'
    ,'Fijian'
    ,'Finnish'
    ,'French'
    ,'Fula; Fulah; Pulaar; Pular'
    ,'Galician'
    ,'Georgian'
    ,'German'
    ,'Greek, Modern'
    ,'Guaraní'
    ,'Gujarati'
    ,'Haitian; Haitian Creole'
    ,'Hausa'
    ,'Hebrew (modern)'
    ,'Herero'
    ,'Hindi'
    ,'Hiri Motu'
    ,'Hungarian'
    ,'Interlingua'
    ,'Indonesian'
    ,'Interlingue'
    ,'Irish'
    ,'Igbo'
    ,'Inupiaq'
    ,'Ido'
    ,'Icelandic'
    ,'Italian'
    ,'Inuktitut'
    ,'Japanese'
    ,'Javanese'
    ,'Kalaallisut, Greenlandic'
    ,'Kannada'
    ,'Kanuri'
    ,'Kashmiri'
    ,'Kazakh'
    ,'Khmer'
    ,'Kikuyu, Gikuyu'
    ,'Kinyarwanda'
    ,'Kirghiz, Kyrgyz'
    ,'Komi'
    ,'Kongo'
    ,'Korean'
    ,'Kurdish'
    ,'Kwanyama, Kuanyama'
    ,'Latin'
    ,'Luxembourgish, Letzeburgesch'
    ,'Luganda'
    ,'Limburgish, Limburgan, Limburger'
    ,'Lingala'
    ,'Lao'
    ,'Lithuanian'
    ,'Luba-Katanga'
    ,'Latvian'
    ,'Manx'
    ,'Macedonian'
    ,'Malagasy'
    ,'Malay'
    ,'Malayalam'
    ,'Maltese'
    ,'Māori'
    ,'Marathi (Marāṭhī)'
    ,'Marshallese'
    ,'Mongolian'
    ,'Nauru'
    ,'Navajo, Navaho'
    ,'Norwegian Bokmål'
    ,'North Ndebele'
    ,'Nepali'
    ,'Ndonga'
    ,'Norwegian Nynorsk'
    ,'Norwegian'
    ,'Nuosu'
    ,'South Ndebele'
    ,'Occitan'
    ,'Ojibwe, Ojibwa'
    ,'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic'
    ,'Oromo'
    ,'Oriya'
    ,'Ossetian, Ossetic'
    ,'Panjabi, Punjabi'
    ,'Pāli'
    ,'Persian'
    ,'Polish'
    ,'Pashto, Pushto'
    ,'Portuguese'
    ,'Quechua'
    ,'Romansh'
    ,'Kirundi'
    ,'Romanian, Moldavian, Moldovan'
    ,'Russian'
    ,'Sanskrit (Saṁskṛta)'
    ,'Sardinian'
    ,'Sindhi'
    ,'Northern Sami'
    ,'Samoan'
    ,'Sango'
    ,'Serbian'
    ,'Scottish Gaelic; Gaelic'
    ,'Shona'
    ,'Sinhala, Sinhalese'
    ,'Slovak'
    ,'Slovene'
    ,'Somali'
    ,'Southern Sotho'
    ,'Spanish; Castilian'
    ,'Sundanese'
    ,'Swahili'
    ,'Swati'
    ,'Swedish'
    ,'Tamil'
    ,'Telugu'
    ,'Tajik'
    ,'Thai'
    ,'Tigrinya'
    ,'Tibetan Standard, Tibetan, Central'
    ,'Turkmen'
    ,'Tagalog'
    ,'Tswana'
    ,'Tonga (Tonga Islands)'
    ,'Turkish'
    ,'Tsonga'
    ,'Tatar'
    ,'Twi'
    ,'Tahitian'
    ,'Uighur, Uyghur'
    ,'Ukrainian'
    ,'Urdu'
    ,'Uzbek'
    ,'Venda'
    ,'Vietnamese'
    ,'Volapük'
    ,'Walloon'
    ,'Welsh'
    ,'Wolof'
    ,'Western Frisian'
    ,'Xhosa'
    ,'Yiddish'
    ,'Yoruba'
    ,'Zhuang, Chuang'] ;
   

}
 

