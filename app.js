require('dotenv').config();

// Init app
const express = require('express');
const app = express();

// Database connection
const mongoose = require('mongoose');

mongoose.set('debug', true);
// mongoose.set('debug', (collection, method, ...args) => {
//   const result = `Mongoose: ${collection}.${method}(${args.join(', ')})`;
//   console.log(result);
//   console.log(`Mongoose: ${collection}.${method}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);
// });

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
};

mongoose.connect(process.env['MONGO_URI'], connectOptions);

// Set config
const { checkLogLevel } = require('./controllers/utils/logConfig');
checkLogLevel();

// Import routers
const employeeRouter = require('./routers/employees');
const userRouter = require('./routers/users');
const logRouter = require('./routers/logs');

// RequestID
const requestIdentifier = require('./controllers/middlewares/requestID/requestID');

// Error handlers
const { errors } = require('celebrate');
const { ErrorHandler } = require('./controllers/middlewares/errorHandler/errorHandler');

// Logger
const logger = require('./controllers/middlewares/logger/middleware');

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(requestIdentifier);
app.use('/users', userRouter);
app.use('/employees', employeeRouter);
app.use('/logs', logRouter);

// Error handlers
app.use(logger);
app.use(errors());
app.use(ErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port', process.env.PORT);
});
