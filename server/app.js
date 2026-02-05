import express from 'express';
const app = express();
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'
import mealRoutes from './routes/mealRoutes.js'
import userRoutes from './routes/userRoutes.js'

import pinoHTTP from 'pino-http';
import morgan from 'morgan'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Dev Mode Logger
const httpLogger = pinoHTTP({
    transport: {
        target: 'pino-pretty',
        options: { colorize: true }
    }
});

// app.use(httpLogger);
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Response');
})

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/meals', mealRoutes);



export default app;