const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    category: { type: String, required: true }, 
    description: { type: String, required: true }, 
    poster: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
    postId: { type: String, required: true, unique: true } 
});

const News = mongoose.model('News', newsSchema);

module.exports = News; 