import { Component, OnInit, Input } from '@angular/core';
import { MusicService, Music } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  @Input() title: string;
  @Input() author: string;
  @Input() albumName: string;
  @Input() albumCover: string;

  @Input() src: string;

  @Input() index: number;

  constructor(private musicService: MusicService, private playerService: PlayerService) { }

  ngOnInit() {
  }

  coverExists(){
    return false;
  }

  setActualMusic(){
    this.playerService.setNewMusic(this.musicService.musicList[this.index]);
  }

}
