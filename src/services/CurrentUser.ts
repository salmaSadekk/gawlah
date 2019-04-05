import { User } from "../Models/user";
import { Tours } from "../Models/Tours";
import { Review } from "../Models/Review";
import { Items } from "../Models/Items";

export class CurrentUser {
    
   private  currentUser :User =new User ('','','') ;
    getUser() {
        //C:\Users\m\Desktop\angularIonic\gawlah\src\assets\imgs\UserProfile.png
        console.log('from CurrentUserService'+ {...this.currentUser})
        return {...this.currentUser} ;
    }
    setUser(user :User) {
     this.currentUser = user ;
    }

}