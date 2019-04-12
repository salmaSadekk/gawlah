import { User } from "../Models/user";
import { Tours } from "../Models/Tours";
import { Review } from "../Models/Review";
import { Items } from "../Models/Items";

export class CurrentUser {
    constructor( private storage: Storage) {

    }
   private  currentUser :User =new User ('','','') ;
    getUser() {
        //C:\Users\m\Desktop\angularIonic\gawlah\src\assets\imgs\UserProfile.png
        console.log('from CurrentUserService'+ {...this.currentUser})
        return {...this.currentUser} ;
    }
    setUser(user :User) {
     this.currentUser = user ;
     this.storage.set('uid', user.uid);
     this.storage.set('profilePic' , user.profilePic) ;
     this.storage.set('name' , user.name) ;

    }

}