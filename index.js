require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const app = express();
const serverSocket = require('http').createServer(app);
const io = require('socket.io')(serverSocket, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

const numero = 0;
io.on('connection', (socket) => {
  socket.emit('home', numero);
});

// const controllers = require('./controllers');
const middlewares = require('./middlewares');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', (req, res) => res.render('home'));

app.use(middlewares.error);

serverSocket.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
