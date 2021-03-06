const express = require('express');
const router = express.Router();

const Blog = require('./../models/blog');

const isAuthenticated = require('./../middleware/auth');
const isAuthor = require('./../middleware/author');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

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
router.get('/blogs/new', isAuthenticated, (req, res) => {
    res.render('new');
});

// Create
router.post('/blogs', isAuthenticated, (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    const blog = {
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Blog.create(blog)
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
router.get('/blogs/:id/edit', isAuthor, (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render('edit', {blog});
        })
        .catch(err => {
            res.redirect('back');
        });
});

// Update
router.put('/blogs/:id', isAuthor, (req, res) => {
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
router.delete('/blogs/:id', isAuthor, (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(blog => {
            res.redirect('/blogs');
        })
        .catch(err => {
            res.redirect(`/blogs`);
        });
});

module.exports = router;