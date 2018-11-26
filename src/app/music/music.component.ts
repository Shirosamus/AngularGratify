import { Component, Input } from '@angular/core';
import { MusicService, Music } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {

  @Input() music: Music;

  @Input() index: number;

  constructor(private musicService: MusicService, private playerService: PlayerService) { }

  coverExists(){
    return false;
  }

  setActualMusic(){
    this.playerService.setNewMusic(this.music);
  }

}
