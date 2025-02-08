import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// routes
import userRoute from './routes/user.route';

// load db connection
import connectMDB from './config/mongoose'; // connect to MongoDB

// load library
import './library/logger.lib';

const app  = express();
const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || '127.0.0.1';

// parse cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

console.log('✅ Server starting...');

// log
app.use((req: Request, res: Response, next: NextFunction) => {
	const originalSend = res.send;
	res.send = function (body) {
		global.logger.info({
			"Method"        : req.method,
			"URL"           : req.url,
			"Headers"       : req.headers,
			"Authorization" : req.headers.authorization,
			"Query"         : req.query,
			"Param"         : req.params,
			"Body"          : req.body,
			"Respone Status": res.statusCode,
			"Response"      : body
		});
		return originalSend.apply(this, [body]);
	};
	next();
});

app.get('/status', (req: Request, res: Response) => {
	res.status(200).json({
		status: 'success',
		message: '🚀 Server is running...',
		code: 200
	});
});

// modules user.
app.use('/users', userRoute);

// connect MongoDB before starting the server
connectMDB().then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running at ${HOST}:${PORT}`);
	});
}).catch(err => {
	console.error(`❌ Server failed to start:`, err);
});
