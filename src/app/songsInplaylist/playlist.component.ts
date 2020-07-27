import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'

})
export class PlaylistComponent implements OnInit {
  playLists = null;
  songId;
  playListId;
  userId;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getSongsInPlayList()
      .subscribe(playLists => {
        this.playLists = playLists;
        console.log(this.playLists);
      });
  }
  deleteSongsInPlayList() {
    const playList = this.playLists.find();
    playList.isDeleting = true;
    this.accountService.deletesongInplayList(this.songId, this.playListId, this.userId)
      .subscribe((res) => {
        this.playLists = this.playLists.filter()
        console.log(res);

      });
  }

}
