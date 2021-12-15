import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StyleService } from './services/style.service';
import { SidenavService } from './services/sidenav.service';
import { FormsModule } from '@angular/forms';
import { NewBoardFormComponent } from './components/new-board-form/new-board-form.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { AllBoardsDataService } from './services/all-boards-data.service';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    SidebarComponent,
    DashboardComponent,
    NewBoardFormComponent,
    CardDetailsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService, 
    StyleService,
    SidenavService,
    AllBoardsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
