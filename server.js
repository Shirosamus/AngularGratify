const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();

const DIR = 'src/assets/music/';
const DBDIR = 'src/assets/data/musicDatabase.json';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/api', function (req, res) {
    res.end('file catcher example');
});

// app.post('/api/upload', upload.single('photo'), function (req, res) {
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//             success: false
//         });

//     } else {
//         console.log('file received');
//         return res.send({
//             success: true
//         })
//     }
// });

var uploadForm = upload.fields([{ name: 'music', maxCount: 1 }, { name: 'cover', maxCount: 1 }]);
app.post('/api/upload', uploadForm, function (req, res) {
    var title = req.param('title');
    var author = req.param('author');
    var album = req.param('album');
    var music = req.files['music'][0];
    var cover;
    if (req.files['cover'] !== undefined) {
        cover = req.files['cover'][0];
    }

    //Move files to their own dir
    var musicMoved = moveFile(music.path, ".mp3", title, author, album);
    var coverMoved;
    if(cover)
        coverMoved = moveFile(cover.path, ".png", "cover", author, album);

    //Add the music to the database
    if(musicMoved)
        addMusicToDB(title, author, album);

    res.send(musicMoved);
});

function addMusicToDB(title, author, album){
    var rawDB = fs.readFileSync(DBDIR);
    var jsonDB = JSON.parse(rawDB);
    jsonDB.push({"title" : title, "author": author, "album": album});
    fs.writeFile(DBDIR, JSON.stringify(jsonDB));
}

function moveFile(filepath, extension, fileName, author, album) {
    //Copy it only if it doesnt exist
    var destFilepath = DIR + author + '/' + album + '/' + fileName + extension;
    if (fs.existsSync(destFilepath)) {
        console.log("file already exists")
        return false;
    }

    var source = fs.createReadStream(filepath);
    var dir = DIR + author;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    dir += '/' + album;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var dest = fs.createWriteStream(destFilepath);

    source.pipe(dest);
    dest.on('end', function () { console.log("New music file ! (" + destFilepath + ")"); dest.close(); source.close(); });
    dest.on('error', function (err) { console.error("Error while moving a file from " + filepath + " to " + destFilepath + " ! (" + err + ")"); dest.close(); source.close(); });
    dest.on('close', function () {fs.unlink(filepath, ()=>{});});
    return true;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Node.js server is running on port ' + PORT);
});