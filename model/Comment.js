const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema    = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Comment = mongoose.model('Comment',CommentSchema )

module.exports = Comment