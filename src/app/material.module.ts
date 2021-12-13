import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        DragDropModule,
        MatMenuModule,
        MatDialogModule,
        MatTooltipModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        DragDropModule,
        MatMenuModule,
        MatDialogModule,
        MatTooltipModule
    ]
})
export class MaterialModule { }
