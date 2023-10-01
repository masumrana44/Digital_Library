import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from '../app/middleware/GlobalErrorHandler';
import routes from '../app/routes';
import handleNotFoundApi from '../app/middleware/HandleNotFoundApi';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use('/api/v1', routes);

// use Error handler
app.use(globalErrorHandler);
app.use(handleNotFoundApi);

export default app;
