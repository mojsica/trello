import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './services/sidenav.service';
import { StyleService } from './services/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trello';

  constructor(
    public router: Router,
    private styleService: StyleService,
    private sidenavService: SidenavService
  ) { }

  onToggleSidenav() {
    this.sidenavService.toggleState();
  }

  get sidenavState() {
    return this.sidenavService.getSidenavState();
  }

  get curentStyleColor(): string {
    return this.styleService.getCurrentStyleColor();
  }
}
