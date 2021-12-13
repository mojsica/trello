import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StyleService } from 'src/app/services/style.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('inputListTitleField') inputListTitleField: ElementRef;
  @ViewChild('inputCardTitleField') inputCardTitleField: ElementRef;

  boardData$: Observable<any>;
  boardData: any;
  cardTitleForSubmission = '';
  listTitleForSubmission = '';
  addNewListActive = false;

  constructor(
    private dataService: DataService,
    private styleService: StyleService,
    private activatedRoute: ActivatedRoute,
    private sidenavService: SidenavService
  ) {
    this.boardData$ = this.dataService.getBoard(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('mojsa params  === id', params['id']);
      this.boardData$ = this.dataService.getBoard(params['id']);
      this.boardData$?.subscribe(data => {
        console.log('Board-Complete === id', data);

        this.boardData = data;

        this.styleService.setCurrentStyleColor(this.boardData.prefs.backgroundColor);

        this.boardData.lists.forEach((list: any) => {
          list.cards = this.boardData.cards.filter((card: any) => card.idList === list.id)
          list.cards.idList = list.id; // Proveriti zasto je ova linija ovde
        });
      });
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const cardForUpdate = event.container.data[event.currentIndex];
      cardForUpdate.pos = this.calculateElementPositionInArray(event.container.data, event.currentIndex);
      this.dataService.updateCard(cardForUpdate).subscribe((data) => { console.log(data) });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const cardForUpdate = event.container.data[event.currentIndex];
      cardForUpdate.idList = event.container.data.idList;
      cardForUpdate.pos = this.calculateElementPositionInArray(event.container.data, event.currentIndex);
      this.dataService.updateCard(cardForUpdate).subscribe(data => { console.log(data) });
    }
  }

  calculateElementPositionInArray(array: any[], index: number) {
    let pos: number = array[index].pos;
    if (array.length > 1) {
      switch (index) {
        case 0:
          pos = array[index + 1].pos - 1;
          break;
        case array.length - 1:
          pos = array[index - 1].pos + 1;
          break;
        default:
          const positionUpper = array[index + 1].pos;
          const positionLower = array[index - 1].pos;
          pos = (positionUpper + positionLower) / 2;
      }
    }
    return pos;
  }

  onChangeBoardName() {
    this.dataService.updateBoardName(this.boardData).subscribe(data => console.log(data));
  }

  onChangeListName(list: any) {
    this.dataService.updateListName(list).subscribe(data => console.log(data));
  }

  onArchiveTheList(list: any) {
    this.dataService.archiveList(list).subscribe((data: any) => {
      list.closed = data?.closed;
      this.boardData.lists = this.boardData.lists.filter((list: any) => !list.closed);
    });
  }

  onArchiveAllCards(list: any) {
    this.dataService.archiveAllCardsInList(list).subscribe(() => {
      list.cards = [];
    });
  }

  onAddCardInputActive(list: any) {
    this.cardTitleForSubmission = ''; // Reset the value if it is changed in another open input
    this.boardData.lists.forEach((list: any) => { list.addCardInputActive = false; }); // Close other open input if there is
    list.addCardInputActive = true; // set active input
    setTimeout(() => { this.inputCardTitleField.nativeElement.focus(); }, 0); // focus on the input
  }

  onAddListInputActive() {
    this.addNewListActive = true;
    setTimeout(() => { this.inputListTitleField.nativeElement.focus(); }, 0); // focus on the input
  }

  onSubmitCardName(list: any) {
    if (this.cardTitleForSubmission !== '') {
      const newCard: any = {
        idList: list.id,
        name: this.cardTitleForSubmission
      }
      this.cardTitleForSubmission = '';
      this.dataService.createNewCard(newCard).subscribe((createdCard: any) => {
        list.cards.push(createdCard);
        this.inputCardTitleField.nativeElement.focus(); // focus back on the input
      });
    }
  }

  onSubmitListName() {
    if (this.listTitleForSubmission !== '') {
      const newList: any = {
        idBoard: this.boardData.id,
        name: this.listTitleForSubmission,
        pos: (this.boardData.lists.length > 0 ? (this.boardData.lists[this.boardData.lists.length - 1].pos + 1) : 1) // adding at the last possition
      }
      this.listTitleForSubmission = '';
      this.dataService.createList(newList).subscribe((createdList: any) => {
        createdList.cards = [];
        this.boardData.lists.push(createdList);
        this.inputListTitleField.nativeElement.focus(); // focus back on the input
      });
    }
  }

  get sidenavState() {
    return this.sidenavService.getSidenavState();
  }
}
