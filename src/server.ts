import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// routes
import userRoute from './routes/user.route';

// load db connection
import connectMDB from './config/mongoose'; // connect to MongoDB

// middleware
import logger from './middleware/logger.middleware';

const app = express();
const PORT = process.env.PORT || 8888;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// middleware
app.use(logger);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

// modules user.
app.use('/users', userRoute);

// connect MongoDB before starting the server
connectMDB().then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
	});
}).catch(err => {
	console.error(`❌ Server failed to start:`, err);
});
