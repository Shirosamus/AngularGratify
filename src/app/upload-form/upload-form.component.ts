import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MusicService, Music } from '../services/music.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


const dir = "http://localhost:3000/api/upload";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit, AfterViewInit {
  musicList: Music[];
  artistList: string[];
  musicSuscription: Subscription;

  uploadForm: FormGroup;
  submitted = false;
  popover;

  files = { "cover": undefined, "music": undefined };


  constructor(private musicService: MusicService, private authService: AuthService, private formBuilder: FormBuilder, private http: HttpClient) { }

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
      musicFile: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
  }

  getAllArtists() {
  }

  ngOnDestroy() {
    this.musicSuscription.unsubscribe();
  }

  isConnected() {
    return this.authService.isAuth;
  }

  //element is "cover" or "music"
  setFile(event, element) {
    if (event.srcElement.files[0]) {
      this.files[element] = event.srcElement.files[0];
    }
  }

  submitFile(popover) {
    if (this.uploadForm.dirty && this.uploadForm.valid) {
      // this.dir += this.uploadForm.value.author + "/" + this.uploadForm.value.album;
      let data = {
        "title": this.uploadForm.value.title,
        "author": this.uploadForm.value.author,
        "alubm": this.uploadForm.value.album
      };
      // let headers = new HttpHeaders()
      //   .set('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
      // let headers = new HttpHeaders().set('content-type', 'multipart/form-data')
      const formData: FormData = new FormData();

      formData.append((0).toString(), this.files["music"], "music");
      if (this.files["cover"]) {
        formData.append((1).toString(), this.files["cover"], "cover");
      }

      formData.append("data", JSON.stringify(data));
      this.http.post(dir, formData)
        .subscribe(
          (r) => { console.log('got response : ', r.toString()) }
        )
    } else {
      popover.innerHTML = "You missed something ! Double check, please.";
      this.popoverDisappearance(popover);
    }
  }

  private timeoutInstance;
  popoverDisappearance(popover) {
    if (this.timeoutInstance != undefined)
      clearTimeout(this.timeoutInstance);

    popover.style.visibility = "visible";
    popover.style.opacity = "1";
    this.timeoutInstance = setTimeout(() => {
      popover.style.opacity = "0";
      setTimeout(() => {
        popover.style.visibility = "hidden";
      }, 500);
    }, 4000);
  }
}
