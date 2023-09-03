const express = require('express');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const NotFoundError = require('./utils/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'jwt-super-secret-key',
  JWT_TTL = '7d',
  ALLOWED_CORS_ORIGINS = '',
} = process.env;

const allowedCorsDomains = ALLOWED_CORS_ORIGINS.split(',');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: allowedCorsDomains,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
}));

app.use((req, res, next) => {
  req.jwtSecret = JWT_SECRET;
  req.jwtTTL = JWT_TTL;
  next();
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', ...login);
app.post('/signup', ...createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, _, next) => next(new NotFoundError(`Path ${req.path} not found`)));

app.use(errorLogger);

app.use(celebrateErrors());
app.use(errors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
