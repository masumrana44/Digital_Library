import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from '../app/middleware/GlobalErrorHandler';
import routes from '../app/routes';
import handleNotFoundApi from '../app/middleware/HandleNotFoundApi';
import cookieParser from 'cookie-parser';
const app: Application = express();

// use cors
app.use(cors());

// pars access cookie
app.use(cookieParser());
// parse json data
app.use(express.json());
// encoded body data
app.use(express.urlencoded({ extended: true }));

// use app all route
app.use('/api/v1', routes);
app.use('/', (req, res) => {
  res.send('The Sever is running');
});
// use Error handler
app.use(globalErrorHandler);
app.use(handleNotFoundApi);

export default app;
