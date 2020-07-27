import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayListRoutingModule } from './playList-routing.module';
import { LayoutComponent } from './layout.component';
import { PlaylistComponent } from './playlist.component';
import { CreateplayListComponent } from './createplay-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PlayListRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PlaylistComponent,
        CreateplayListComponent
    ]
})
export class PlayListModule { }