import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PlaylistComponent } from './playlist.component';
import { CreateplayListComponent } from './createplay-list.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PlaylistComponent },
            { path: 'add', component: CreateplayListComponent },
            { path: 'edit/:id', component: CreateplayListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayListRoutingModule { }