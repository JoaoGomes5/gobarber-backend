import 'reflect-metadata';
import 'dotenv/config';

import express, { Request , Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolders));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error , request: Request , response: Response, _: NextFunction) => {

    if(err instanceof AppError){
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
});

app.listen(3333, () => {
  console.log('🚀 Server Running on port 3333 🚀');
});