import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MusicService, Music } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit, OnDestroy {

  public static count: number = 0;

  @Input() music: Music;

  @Input() index: number;

  constructor(private musicService: MusicService, private playerService: PlayerService) { }

  ngOnInit() {
    MusicComponent.count++;
  }

  ngOnDestroy() {
    MusicComponent.count--;
  }

  coverExists(){
    return false;
  }

  setActualMusic(){
    this.playerService.setNewMusic(this.music);
  }

}
