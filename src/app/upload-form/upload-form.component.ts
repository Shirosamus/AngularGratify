import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MusicService, Music } from '../services/music.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  uploadForm: FormGroup;
  submitted = false;

  musicList: Music[];
  artistList: string[];
  musicSuscription: Subscription;

  constructor(private musicService: MusicService, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.musicSuscription = this.musicService.getMusic().subscribe(
      musics => {
        this.musicList = musics;
        this.artistList = [];
        this.musicList.forEach(music => {
          if (!this.artistList.includes(music.author))
            this.artistList.push(music.author);
        });
      }
    );


    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      album: ['', Validators.required],
      albumCover: [''],
      musicFile: ['']
    });
  }

  getAllArtists() {
  }

  ngOnDestroy() {
    this.musicSuscription.unsubscribe();
  }

  isConnected() {
    return this.authService.isAuth;
  }

  submitFile() {
    console.log(this.uploadForm.value);
  }
}
