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

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
 first =true ;
 second=false ;
 third =false ;
 img ='' ;
 constructor (  private currentUser :CurrentUser,private transfer :FileTransfer, private authservice :AuthService, private toastCtrl :ToastController,public camera: Camera  ,private authService :AuthService ,
  private loading :LoadingController ,private alertCtrl :AlertController ,private navCtrl :NavController) {

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
      this.currentUser.setUser( new User(dataFromServer.user_id , dataFromServer.username , dataFromServer.profileImg) ) ;
      
    
  
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
       //this.fileTransfer(base64Image) ;
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
 

