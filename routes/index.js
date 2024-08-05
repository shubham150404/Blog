require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../model/Comment')
const BlogPost = require('../model/BlogPost')
var jwt = require('jsonwebtoken');
const Commentcontroller = require('../controller/CommentController')
const BlogPostcontroller = require('../controller/BlogPostController')
/* GET home page. */


router.post('/Comment_create',Commentcontroller.Comment_create );

router.get('/CommentData',Commentcontroller.Comment_sequre,Commentcontroller.Comment_get);

router.put('/CommentUpdate/:id',Commentcontroller.Comment_sequre,Commentcontroller.Comment_Update );

router.delete('/CommentDelete/:id',Commentcontroller.Comment_sequre,Commentcontroller.Comment_Delete);


router.post('/BlogPost_Create',BlogPostcontroller.BlogPost_create );

router.get('/BlogPostData',BlogPostcontroller.BlogPost_sequre,BlogPostcontroller.BlogPost_get);

router.put('/BlogPostUpdate/:id',BlogPostcontroller.BlogPost_sequre,BlogPostcontroller.BlogPost_Update);

router.delete('/BlogPostDelete/:id',BlogPostcontroller.BlogPost_sequre,BlogPostcontroller.BlogPost_Delete);

module.exports = router;
