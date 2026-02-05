import express from 'express';
const app = express();
import cors from 'cors';
import authRoutes from './routes/userRoutes.js'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Response');
})

app.use('/auth', authRoutes);



export default app;