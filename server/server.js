const PORT = process.env.PORT;
import { connectMongo } from './config/db.js';
import dotenv from './config/env.js';
import app from './app.js';




connectMongo().then(() => {
    app.listen(PORT, () => {
        console.log("Server started listening on port", PORT);
    });
}).catch((error) => {
    console.log("Error while starting server");
    process.exit();
})
