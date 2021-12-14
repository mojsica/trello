import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Card } from '../models/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card: Card;
  
  constructor(
    private dialog: MatDialog,
    private route: Router
  ) { }

  onOpenCardDetails(){
    this.route.navigate(['/card', this.card.idBoard, this.card.shortLink]);
  } 
}
