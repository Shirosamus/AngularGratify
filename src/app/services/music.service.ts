export class MusicService{
    musicList = [
        new Music(
            "Dark Side",
            "Muse",
            "Simulation Theory"
        ),
        new Music(
            "Stand by me",
            "Florence + The Machine",
            "Songs from Final Fantasy XV"
        ),
        new Music(
            "Bohemian Rhapsody",
            "Queen",
            "A Night at the Opera"
        )
    ]
}

export class Music {
    title: string;
    author: string;
    albumName: string;

    constructor(title: string, author: string, albumName: string){
        this.title = title;
        this.author = author,
        this.albumName = albumName;
    }
}