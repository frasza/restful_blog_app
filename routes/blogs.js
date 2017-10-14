const express = require('express');
const Blog = require('./../database');
const router = express.Router();

// RESTful routes

router.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Index
router.get('/blogs', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.render('index', {blogs});
        })
        .catch(error => {
            console.log(error);
        });
});

// New
router.get('/blogs/new', (req, res) => {
    res.render('new');
});

// Create
router.post('/blogs', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog)
        .then(blog => {
            res.redirect('/blogs');
        })
        .catch(err => {
            res.render('new');
        });
});

// Show
router.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render('show', {blog});
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// Edit 
router.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render('edit', {blog});
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// Update
router.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog)
        .then(blog => {
            res.redirect(`/blogs/${req.params.id}`);
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// Delete
router.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(blog => {
            res.redirect('/blogs');
        })
        .catch(err => {
            res.redirect(`/blogs`);
        });
});

module.exports = router;