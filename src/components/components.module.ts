import { NgModule } from '@angular/core';
import { RatingComponent } from './rating/rating';
import { CommentReviewComponent } from './comment-review/comment-review';
import { FlashCardComponent } from './flash-card/flash-card';
@NgModule({
	declarations: [RatingComponent,
    CommentReviewComponent,
    FlashCardComponent],
	imports: [],
	exports: [RatingComponent,
    CommentReviewComponent,
    FlashCardComponent]
})
export class ComponentsModule {}
