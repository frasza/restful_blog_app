// Imports
const express          = require('express'),
      app              = express(),
      bodyParser       = require('body-parser'),
      mongoose         = require('mongoose'),
      methodOverride   = require('method-override'),
      expressSanitizer = require('express-sanitizer'),
      blogs            = require('./routes/blogs'),
      Blog             = require('./database');

// App config
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

// App routes
app.use('/', blogs);

// App listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});