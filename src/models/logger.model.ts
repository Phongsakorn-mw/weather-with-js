import mongoose, {Schema, Document} from "mongoose";
import moment from "moment";

interface ILogs extends Document {
    method   : string;
    url      : string;
    timestamp: Date;
    headers  : object;
    body     : object;
}


const LogSchema: Schema = new Schema<ILogs>({
    method   : { type: String, required: true },
    url      : { type: String, required: true },
    timestamp: { type: Date, default: moment().toDate() },
    headers  : { type: Object, default: {} },
    body     : { type: Object, default: {} },
});


export const LogModel = mongoose.model<ILogs>('Logs', LogSchema);