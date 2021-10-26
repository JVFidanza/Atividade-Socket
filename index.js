require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const serverSocket = require('http').createServer(app);
const io = require('socket.io')(serverSocket, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});
const { getAll } = require('./models/produtos');

app.use('/public', express.static('public'));
const { PORT } = process.env;

io.on('connection', async (socket) => {
  const produtos = await getAll();
  socket.emit('home', produtos);
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
  
  const teste = 'teste de envio de variavel';
  app.get('/home', (req, res) => res.render('home', { teste }));
  
  app.use(middlewares.error);
  
  serverSocket.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
