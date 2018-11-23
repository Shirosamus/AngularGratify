import { Component, OnInit, Input } from '@angular/core';
import { Music, MusicService } from '../services/music.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-music-list-view',
  templateUrl: './music-list-view.component.html',
  styleUrls: ['./music-list-view.component.scss']
})
export class MusicListViewComponent implements OnInit {
  @Input() isLogged: boolean;
  musicList: Music[];

  constructor(private musicService: MusicService, private authService: AuthService) { }

  ngOnInit() {
    this.musicList = this.musicService.musicList;
  }

  isConnected(){
    return this.authService.isAuth;
  }
}
