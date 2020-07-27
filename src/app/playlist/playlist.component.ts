import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'

})
export class PlaylistComponent implements OnInit {
  playLists = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getPlayList()
      .subscribe(playLists => {
        this.playLists = playLists;
        console.log(this.playLists);
      });
  }
  deletePlayList(id: number) {
    const playList = this.playLists.find(x => x.playListId === id);
    playList.isDeleting = true;
    this.accountService.deleteplayList(id)
      .subscribe((res) => {
        this.playLists = this.playLists.filter(x => x.playListId !== id)
        console.log(res);

      });
  }

}
