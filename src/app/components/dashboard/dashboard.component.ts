import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StyleService } from 'src/app/services/style.service';
import { DataService } from '../board/data.service';
import { Board } from '../board/boards';
import { NewBoardFormComponent } from '../new-board-form/new-board-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allBoards$ = this.boardService.getAllBoards();
  constructor(
    private router: Router,
    private boardService: DataService,
    private styleService: StyleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.styleService.setCurrentStyleColor('');
  }

  onCreateBoard() {
    const dialogRef = this.dialog.open(NewBoardFormComponent, {
      width: '458px',
      position: {
        top: '25px',
      }
    });

    dialogRef.afterClosed().subscribe((board: Board) => {
      if (board) {
        this.allBoards$ = this.boardService.getAllBoards(); // Refreash the boards

        // resulting board, after the creation, does not have a property "shortLink"
        let shortLink = '';
        this.allBoards$.subscribe((boards: Board[]) => {
          shortLink = boards.filter(element => element.id === board.id)[0].shortLink;

          this.router.navigate(['/board', shortLink]); // navigate to the new board 
        });
      }
    });
  }
}
