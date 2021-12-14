import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ActionOnCard, Card } from '../models/models';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  card: Card;
  actionsOnCard: ActionOnCard[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private dataService: DataService,
    private dialogRef: MatDialogRef<CardDetailsComponent>
  ) { }

  ngOnInit(): void {

    this.dataService.getCard(this.data.id).subscribe((card: Card) => {
      console.log('card', card);
      this.card = card;
    })
    this.dataService.getActionsOnCard(this.data.id).subscribe((actionsOnCard: ActionOnCard[]) => {
      console.log('actionsOnCard', actionsOnCard);
      this.actionsOnCard = actionsOnCard;
    })
  }

  onChangeCardName() {
    if (this.card.name) {
      this.dataService.updateCard(this.card).subscribe(res=>console.log(res));
    } else {
      this.dataService.getCard(this.card.id).subscribe((card: Card) => { this.card.name = card.name; });
    }
  }

  onArchiveCard() {
    this.dataService.archiveCard(this.card.id).subscribe(()=>{
      this.dialogRef.close();
    });
  }

  onDeleteComment(action: ActionOnCard) {
    this.dataService.deleteCommentOnCard(action).subscribe(()=> {
      this.actionsOnCard = this.actionsOnCard.filter(element => element.id !== action.id);
    });
  }

  onAddComment(action: ActionOnCard) {
    this.actionsOnCard.unshift(action);
  }

}
