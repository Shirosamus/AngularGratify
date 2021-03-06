import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Music, MusicService } from '../services/music.service';

@Component({
  selector: 'app-music-list-view',
  templateUrl: './music-list-view.component.html',
  styleUrls: ['./music-list-view.component.scss']
})
export class MusicListViewComponent implements OnInit, OnDestroy {
  @Input() isLogged: boolean;
  keyword: string = "";
  musicList: Music[];
  musicListFiltered: Music[] = [];
  musicSuscription: Subscription;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.musicSuscription = this.musicService.getMusic().subscribe(
      musics => {
        this.musicList = musics;
        this.updateSearchList();
      }
    );
  }

  ngOnDestroy() {
    this.musicSuscription.unsubscribe();
  }

  //Update the displayed list when the keyword is changed
  updateSearchList() {
    this.musicListFiltered = this.musicList.filter(music => {
      return music.title.toLowerCase().includes(this.keyword.toLowerCase())
      || music.author.toLowerCase().includes(this.keyword.toLowerCase())
      || music.albumName.toLowerCase().includes(this.keyword.toLowerCase())
    });
  }
}
