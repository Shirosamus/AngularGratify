import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { MusicListViewComponent } from './music-list-view/music-list-view.component';
import { MusicComponent } from './music/music.component';
import { PlayerComponent } from './player/player.component';

import { AuthService } from './services/auth.service';
import { MusicService } from './services/music.service';
import { PlayerService } from './services/player.service';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicListViewComponent,
    HomeViewComponent,
    MusicComponent,
    PlayerComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    MusicService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
