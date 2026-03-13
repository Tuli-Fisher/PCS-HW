import express from 'express';
import http from 'http';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import { time } from 'console';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri);

  try {
    const db = await client.db('blogPosts');

    req.dtBase = await db.collection('blogPosts');

    next();
  } catch (e) {
    next(e);
  }
});

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/posts', async (req, res, next) => {
  const posts = await req.dtBase.find()/*.sort({date: 1}).skip(2).limit(2)*/.toArray()
  res.send(posts);
});

app.post('/addPost', async (req, res, next) => {
  req.author = 'temp author until add login';
  req.time = Date.now();

  try{
    const result = await req.dtBase.insertOne({author: req.author, time: req.time, title: req.body.title, body: req.body.body});
    res.send(result);
  }catch(e){
    next(e);
  }

});

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.end(err.message);
});

server.listen(8080);
