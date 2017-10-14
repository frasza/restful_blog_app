mongoose = require('mongoose');

// Mongoose config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});

// Model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;