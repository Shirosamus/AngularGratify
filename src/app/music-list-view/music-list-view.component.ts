import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Music, MusicService } from '../services/music.service';
import { AuthService } from '../services/auth.service';
import { MusicComponent } from '../music/music.component';

@Component({
  selector: 'app-music-list-view',
  templateUrl: './music-list-view.component.html',
  styleUrls: ['./music-list-view.component.scss']
})
export class MusicListViewComponent implements OnInit, OnDestroy {
  @Input() isLogged: boolean;
  keyword: string = "";
  musicList: Music[];
  musicSuscription: Subscription;

  constructor(private musicService: MusicService, private authService: AuthService) { }

  ngOnInit() {
    this.musicSuscription = this.musicService.getMusic().subscribe(
      musics => {
        this.musicList = musics;
      }
    );
  }

  ngOnDestroy() {
    this.musicSuscription.unsubscribe();
  }

  isConnected() {
    return this.authService.isAuth;
  }

  checkMusicKeyword(music: Music) {
    return music.title.toLowerCase().includes(this.keyword.toLowerCase())
      || music.author.toLowerCase().includes(this.keyword.toLowerCase())
      || music.albumName.toLowerCase().includes(this.keyword.toLowerCase());
  }

  musicFound(){
    return MusicComponent.count === 0;
  }
}
