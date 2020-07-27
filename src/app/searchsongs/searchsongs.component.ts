import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-searchsongs',
  templateUrl: './searchsongs.component.html',
  styleUrls: ['./searchsongs.component.less']
})
export class SearchsongsComponent implements OnInit {
  songs = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getSongs()
      .subscribe(songs => {
        this.songs = songs;
        console.log(this.songs);
      });
  }
  search(searchTerm) {
    console.log(searchTerm);

    if (searchTerm !== "") {
      this.accountService.searchSongName(searchTerm)
        .subscribe(songs => {
          this.songs = songs;
          console.log(this.songs);
        });;

    }
    else {
      console.log(this.songs);

    }
    if (searchTerm !== "") {
      this.accountService.searchArtists(searchTerm)
        .subscribe(songs => {
          this.songs = songs;
          console.log(songs);
        });;

    }
    else {
      console.log(this.songs);

    }
    if (searchTerm !== "") {
      this.accountService.searchAlbum(searchTerm)
        .subscribe(songs => {
          this.songs = songs;
          console.log(songs);
        });;

    }
    else {
      console.log(this.songs);

    }

  }

}
