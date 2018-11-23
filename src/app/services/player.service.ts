import { Music } from "./music.service";
import { ElementRef } from "@angular/core";

export class PlayerService {
    initiated: boolean = false;
    audioPlayer: ElementRef;

    actual: Music;
    currentlyPlaying: boolean = false;
    duration: number;

    setNewMusic(music: Music){
        this.actual = music;
        this.audioPlayer.nativeElement.src = this.getSrc();
        this.play();
        this.duration = this.audioPlayer.nativeElement.duration;
    }

    play() {
        if (this.actual === undefined)
            return;

        this.audioPlayer.nativeElement.play();
        this.currentlyPlaying = true;
    }

    pause() {
        this.audioPlayer.nativeElement.pause();
        this.currentlyPlaying = false;
    }

    currentTime() {
        return this.audioPlayer.nativeElement.currentTime;
    }

    progression(){
        return this.convertToMinutes(this.currentTime()) + "/" + this.convertToMinutes(this.duration);
    }

    convertToMinutes(time: number) {
        return Math.trunc(time / 60) + ":" + (time % 60).toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 });
    }

    getSrc(){
      if(this.audioPlayer === undefined || this.actual === undefined)
        return "./nothing.mp3";
      return "../../assets/music/" + this.actual.author + "/" + 
              this.actual.albumName + "/" + this.actual.title + ".mp3";
    }
}