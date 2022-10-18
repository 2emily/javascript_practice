import cors from 'cors';
import express from 'express';
import { todoRouter } from './routers';
import { errorLogger, errorHandler } from './middlewares';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { db } from './db/config';

dotenv.config();

const app = express();

// CORS 에러 방지
app.use(cors());

// 로그 출력
app.use(morgan('dev'));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// DB 연결
app.use(db);

// api 라우팅
app.use('/api', todoRouter);

// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

export { app };
