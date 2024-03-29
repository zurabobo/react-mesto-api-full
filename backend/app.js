require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

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
    'http://localhost:3001',
    'http://localhost:8080',
    // 'https://react-mestoapi.herokuapp.com',
    'https://react-mestoapi.netlify.app',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', cors(options));

app.use(requestLogger);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9]{8,30}$')),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlValidation),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login,
);

app.use('/', auth, cardsRouter);

app.use('/', auth, usersRouter);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер ${PORT}`);
});
