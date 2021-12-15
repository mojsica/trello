import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AllBoardsDataService } from 'src/app/services/all-boards-data.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { DataService } from '../../services/data.service';
import { Board } from '../models/models';
import { NewBoardFormComponent } from '../new-board-form/new-board-form.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  allBoards$ = this.allBoardsDataService.getAllBoards();
  constructor(
    private dataService: DataService,
    private router: Router,
    private sidenavService: SidenavService,
    private dialog: MatDialog,
    private allBoardsDataService: AllBoardsDataService
  ) { }

  ngOnInit() {
    this.allBoardsDataService.bordsAreRefreshed.subscribe((res) => {
      this.allBoards$ = this.allBoardsDataService.getAllBoards();
    });
  }

  goToDashboard() {
    this.router.navigate(['']);
  }

  onCloseSidenav() {
    this.sidenavService.toggleState();
  }

  onDeleteBoard(board: Board) {
    this.dataService.deleteBoard(board).subscribe(() => {
      this.allBoardsDataService.refreshAllBoards();
      this.router.navigate(['']);
    });
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
        
        this.allBoardsDataService.refreshAllBoards();

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
