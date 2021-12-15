import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActionOnCard } from '../models/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements AfterViewInit{

  @Input() idCard: string; // Indicator that it is a new comment, so wee need idCard in order to save the new comment.
  @Input() action: ActionOnCard;
  @Output() deleteAction = new EventEmitter<ActionOnCard>();
  @Output() addAction = new EventEmitter<ActionOnCard>();
  @ViewChild('inputComment') inputComment: ElementRef;
  
  commentEdit: boolean;
  comment: string;

  constructor(
    private dataService: DataService
  ) { }

  ngAfterViewInit() {
    if (this.idCard) {
      this.inputComment.nativeElement.addEventListener('click', ()=>{
        this.commentEdit = true;
      });
    }
  }

  onEditComment(action: ActionOnCard) {
    this.commentEdit = true;
    this.comment = action.data.text;
    setTimeout(() => { this.inputComment.nativeElement.focus(); }, 0);
  }
  
  onCloseCommentEdit() {
    this.commentEdit = false;
  }

  onSaveComment() {
    if (this.comment) {
      this.commentEdit = false;

      if (!this.idCard) {
        this.action.data.text = this.comment;
        this.dataService.updateCommentOnCard(this.action).subscribe((action: ActionOnCard) => {
          this.action = action;
        });
      } else {
        this.dataService.addCommentOnCard( this.idCard, this.comment).subscribe((action: ActionOnCard) => {
          this.comment = '';
          this.addAction.emit(action);
        });
      }
    }
  }

  onDeleteComment(action: ActionOnCard) {
    this.deleteAction.emit(action);
  }
}
