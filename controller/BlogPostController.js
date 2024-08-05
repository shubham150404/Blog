require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('../model/BlogPost')
var jwt = require('jsonwebtoken');



exports.BlogPost_create = async function (req, res, next) {
    try {
        if (!req.body.title || !req.body.content || !req.body.author || !req.body.tags || !req.body.comments) {
            throw new Error("Please Fill the data")
        }
        if (!req.body.createdAt) {
            req.body.createdAt = Date.now()
          }
          if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
          }
        const BlogPost_data = await BlogPost.create(req.body)
        const Jwt_BlogPost = jwt.sign({ id: BlogPost_data._id },process.env.SECRET_BLOG)
        res.status(201).json({
            status: "sucess",
            message: "BlogPost create",
            data: BlogPost_data,
            Jwt_BlogPost
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.BlogPost_get = async function (req, res, next){
    try {
        const BlogPost_get = await BlogPost.find().populate('comments')
        res.status(201).json({
            status: "sucess",
            message: "BlogPost Find",
            data: BlogPost_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.BlogPost_Update = async function (req, res, next) {
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const BlogPost_get = await BlogPost.findByIdAndUpdate(id, req.body)
        res.status(201).json({
            status: "sucess",
            message: "BlogPost Update",
            data: BlogPost_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.BlogPost_Delete = async function (req, res, next) {
    try {
        id = req.params.id
        await BlogPost.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "BlogPost Delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.BlogPost_sequre = async function (req, res, next) {
    try {
        let BlogPost_Token = req.headers.authorization
        if (!BlogPost_Token) {
            throw new Error("Token not found")
        }
        const Jwt_token = jwt.verify(BlogPost_Token,process.env.SECRET_BLOG);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "BlogPost is not sequre",
        })
    }
}