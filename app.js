// Imports
const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      methodOverride = require('method-override')

const PORT = 3000;

// App config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Mongoose config
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

// RESTful routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Index
app.get('/blogs', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.render('index', {blogs});
        })
        .catch(error => {
            console.log(error);
        });
});

// New
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

// Create
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog)
        .then(blog => {
            res.redirect('/blogs');
        })
        .catch(err => {
            res.render('new');
        });
});

// Show
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render('show', {blog});
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// Edit 
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render('edit', {blog});
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// Update
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog)
        .then(blog => {
            res.redirect(`/blogs/${req.params.id}`);
        })
        .catch(err => {
            res.redirect('/blogs');
        });
});

// App listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});