require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');

const auth = require('./middlewares/auth');
const { urlValidation } = require('./middlewares/urlValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const app = express();

const options = {
  origin: [
    'http://localhost:8080',
    'http://localhost:5000',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'https://mestoapifull.herokuapp.com',
    // 'https://zb.students.nomoredomains.club',
    // 'https://api.zb.students.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, './frontend/build')));
// // Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   // eslint-disable-next-line
//   res.sendFile(path.join(__dirname + '/./frontend/build', 'index.html'));
// });

// const buildPath = path.join(__dirname, 'build');
// app.use(express.static(buildPath));


app.use(express.static(path.join(__dirname + "public")))

// app.use(express.static(path.join(__dirname, 'frontend/build')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.resolve(__dirname, 'frontend/build')));
//   app.get('*', (req, res) => {
//     // eslint-disable-next-line no-global-assign
//     res.sendFile(path.resolve(__dirname = 'frontend/build/index.html'));
//   });
// }
// app.get('*', (req, res) => {
//   // eslint-disable-next-line
//   res.sendFile(path.resolve(__dirname+'/frontend/build/index.html'));
// });

// app.use(express.static(path.join(__dirname, './frontend/build')));
// app.get('*', (req, res) => {
//   // eslint-disable-next-line
//   res.sendFile(path.join(__dirname + '/./frontend/build', 'index.html'));
// });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[A-Za-z0-9]{8,30}$')),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidation),
  }),
}),
createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}),
login);

app.use('/', auth, cardsRouter);

app.use('/', auth, usersRouter);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(port, () => {
  console.log(`Ссылка на сервер: ${port}`);
});
