import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../board/board.service';
import { Board, BoardCreate } from '../board/boards';

@Component({
  selector: 'app-new-board-form',
  templateUrl: './new-board-form.component.html',
  styleUrls: ['./new-board-form.component.scss']
})
export class NewBoardFormComponent implements OnInit {
  boardName = '';
  selectedColor = '#0079bf';

  color11 = '#0079bf';
  color12 = '#d29034';
  color13 = '#519839';
  color21 = '#b04632';
  color22 = '#89609e';
  color23 = '#cd5a91';
  color31 = '#4bbf6b';
  color32 = '#00aecc';
  color33 = '#838c91';

  constructor(
    public dialogRef: MatDialogRef<NewBoardFormComponent>,
    private bordService: BoardService
  ) { }

  ngOnInit(): void { }

  onCreateNewBoard() {

    const bordCreate: BoardCreate = {
      name: this.boardName,
      defaultLists: false,
      prefs_background: this.getColorName(this.selectedColor)
    };
    
    this.bordService.createBord(bordCreate).subscribe((board: Board) => {
      this.dialogRef.close(board);
    });
  }

  onColorSelected(color: string) {
    this.selectedColor = color;
  }

  getColorName(colorCode: string): string {
    const colorMaping = {
      [this.color11]: 'blue',
      [this.color12]: 'orange',
      [this.color13]: 'green',
      [this.color21]: 'red',
      [this.color22]: 'purple',
      [this.color23]: 'pink',
      [this.color31]: 'lime',
      [this.color32]: 'sky',
      [this.color33]: 'grey'
    };
    return colorMaping[colorCode];
  }

}
