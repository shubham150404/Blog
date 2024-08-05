const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema  = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  });


const BlogPost = mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost