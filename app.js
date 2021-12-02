require('dotenv').config();

// Init app
const express = require('express');
const app = express();

// Database connection
const mongoose = require('mongoose');

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logger: console.log,
  loggerLevel: 'debug',
};

mongoose.connect(process.env['MONGO_URI'], connectOptions).catch(error => {
  console.log(error);
});

// Import routers
const employeeRouter = require('./routers/employees');
const userRouter = require('./routers/users');

// Error handlers
const { errors } = require('celebrate');
const { ErrorHandler } = require('./controllers/middlewares/errorHandler/errorHandler');

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/employees', employeeRouter);

// Error handlers
app.use(errors());
app.use(ErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port', process.env.PORT);
});
