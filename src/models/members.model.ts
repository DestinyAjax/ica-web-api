import * as mongoose from 'mongoose';
import {IMembers} from './interfaces/members.interface';
 
const membersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    telephone: String,
    twitterUrl: String,
    linkedinUrl: String,
    githubUrl: String,
    imageUrl: String,
    gender: String
});
 
const memberModel = mongoose.model<IMembers & mongoose.Document>('Member', membersSchema);
 
export default memberModel;