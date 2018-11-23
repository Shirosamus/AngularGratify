import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicListViewComponent } from './music-list-view/music-list-view.component';
import { HomeViewComponent } from './home-view/home-view.component';

import { AuthService } from './services/auth.service';
import { MusicService } from './services/music.service';
import { MusicComponent } from './music/music.component';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './services/player.service';

@NgModule({
  declarations: [
    AppComponent,
    MusicListViewComponent,
    HomeViewComponent,
    MusicComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    MusicService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
