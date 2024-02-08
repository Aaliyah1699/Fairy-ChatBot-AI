import { connectDB } from './db/connect';
import app from './app.js';

const port = process.env.PORT || 4000;

// Connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
start();
