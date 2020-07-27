import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<User>(`https://spotifydbvishali.azurewebsites.net/users/authenticate`, { username, password })
            .pipe(map(user => {

                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {

        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`https://spotifydbvishali.azurewebsites.net/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`https://spotifydbvishali.azurewebsites.net/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`https://spotifydbvishali.azurewebsites.net/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`https://spotifydbvishali.azurewebsites.net/users/${id}`)
            .pipe(map(x => {

                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
    getSongs() {
        return this.http.get("https://spotifydbvishali.azurewebsites.net/api/Admin/SongLists");
    }

    getPlayList() {
        return this.http.get(`https://spotifydbvishali.azurewebsites.net/api/PlayList/UsersPlayLists`);
    }
    AddPlayList(userId, playListName): Observable<any> {
        let id = parseInt(userId);
        console.log(userId, playListName);
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/PlayList/CreatePlayList`, { 'userId': id, 'playListName': playListName })
    }
    updateplayList(id, userId, playListName): Observable<any> {
        let uid = parseInt(id);
        let _id = parseInt(userId);
        console.log(id, _id, playListName);

        return this.http.put(`https://spotifydbvishali.azurewebsites.net/api/Admin/UpdateSong`, { 'id': uid, 'userId': _id, 'playListName': playListName })

    }
    deleteplayList(id): Observable<any> {
        return this.http.delete(`https://spotifydbvishali.azurewebsites.net/api/Admin/DeleteSong?Id=${id}`)

    }
    getSongsInPlayList(): Observable<any> {
        return this.http.get(`https://spotifydbvishali.azurewebsites.net/api/PlayList/GetSongsByPlayListId?Id=1`);
    }

    AddSongInPlayList(id: Number, playListId: Number, userId: Number, songId: Number): Observable<any> {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/PlayList/AddSongsToPlayList`, { 'id': id, 'playListId': playListId, 'userId': userId, 'songId': songId })
    }

    deletesongInplayList(playListId: Number, userId: Number, songId: Number): Observable<any> {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/PlayList/DeleteSongsFromPlayList`, { 'playListId': playListId, 'userId': userId, 'songId': songId })

    }

    searchSongName(SongName) {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/SongsList/SearchSongName`, { songName: SongName })

    }
    searchArtists(Artist) {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/SongsList/SearchArtist`, { artist: Artist })

    }
    searchAlbum(Album) {
        return this.http.post(`https://spotifydbvishali.azurewebsites.net/api/SongsList/SearchAlbum`, { album: Album })

    }



}