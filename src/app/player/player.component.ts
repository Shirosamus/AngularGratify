import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayer : ElementRef;

  constructor(public playerService: PlayerService) { }

  ngAfterViewInit() {
    this.playerService.audioPlayer = this.audioPlayer;
  }
}
