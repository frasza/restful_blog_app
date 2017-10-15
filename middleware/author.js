const Blog = require('./../models/blog');

const isAuthor = (req, res, next) => {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id)
            .then(blog => {
                if (blog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }, err => {
                res.redirect('back');
            })
    } else {
        res.redirect('back');
    }
}

module.exports = isAuthor;