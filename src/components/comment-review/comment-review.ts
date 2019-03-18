import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CommentReviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-review',
  templateUrl: 'comment-review.html'
})
export class CommentReviewComponent {

  text: string;
  

  constructor(public events: Events) {
    console.log('Hello CommentReviewComponent Component');
    this.text = 'Hello World';
    events.subscribe('star-rating:changed', (starRating) => {console.log(starRating)});
  }
  addReview(){
    
  }

}
