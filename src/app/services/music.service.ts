import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from "rxjs/operators";

@Injectable()
export class MusicService {
    constructor(protected http: HttpClient) { }

    public getMusic(): Observable<Music[]> {
        return this.http.get('../../assets/data/musicDatabase.json').pipe(
            map(
                (jsonArray: Object[]) => jsonArray.map(jsonItem => Music.fromJSON(jsonItem))
            )
        );
    }
}

export class Music {
    title: string;
    author: string;
    albumName: string;

    public static fromJSON(json: Object) {
        return new Music(
            json['title'],
            json['author'],
            json['album']
        );
    }

    constructor(title: string, author: string, albumName: string) {
        this.title = title;
        this.author = author;
        this.albumName = albumName;
    }
}