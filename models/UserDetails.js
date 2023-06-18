const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    nickname: { type: String }, 
    avatarUrl: { type: String }, 
    about: { type: String }, 
    user: { type: Schema.Types.ObjectId, ref: 'users' } 
});

module.exports = mongoose.model('UserDetails', userDetailsSchema, 'UserDetails');
