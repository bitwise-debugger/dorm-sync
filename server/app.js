import express from 'express';
const app = express();


app.get('/', (req, res) => {
    res.send('LUN')
})



export default app;