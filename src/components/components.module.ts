import { NgModule } from '@angular/core';
import { RatingComponent } from './rating/rating';
import { CommentReviewComponent } from './comment-review/comment-review';
@NgModule({
	declarations: [RatingComponent,
    CommentReviewComponent],
	imports: [],
	exports: [RatingComponent,
    CommentReviewComponent]
})
export class ComponentsModule {}
