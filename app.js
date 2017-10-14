const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose')

const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});