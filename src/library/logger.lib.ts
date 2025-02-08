import moment from "moment";
import winston from "winston";
import "winston-mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/weather-log";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		winston.format.prettyPrint()
	),
	defaultMeta: { service: 'weather-service' }, // Add default metadata
	transports: [
		// new winston.transports.Console(),
		new winston.transports.File({ filename: `logs_${moment().format('YYYY-MM')}/server_${moment().format('YYYY-MM-DD')}.log` }),
		new winston.transports.MongoDB({
			db        : MONGO_URI,
			collection: `logs_${moment().format('YYYY-MM')}`,
			level     : "info",
			options   : { useUnifiedTopology: true },
		})
	],
});

// global variable
declare global {
    var logger: winston.Logger;
}

global.logger = logger;

export default logger;
