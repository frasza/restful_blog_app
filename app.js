// Imports
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose')

const PORT = 3000;

// App config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

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


// App listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});