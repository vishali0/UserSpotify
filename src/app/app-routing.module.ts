import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { SearchsongsComponent } from './searchsongs/searchsongs.component';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const playListModule = () => import('./playlist/playList.module').then(x => x.PlayListModule);
const songsInplayListModule = () => import('./songsInplaylist/playList.module').then(x => x.PlayListModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'playlist', loadChildren: playListModule },
    { path: 'songsInplayList', loadChildren: songsInplayListModule },
    { path: 'searchsong', component: SearchsongsComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }