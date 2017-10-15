// Imports
const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      methodOverride        = require('method-override'),
      expressSanitizer      = require('express-sanitizer'),
      blogs                 = require('./routes/blogs'),
      user                 = require('./routes/user'),
      Blog                  = require('./models/blog'),
      User                  = require('./models/user'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

// App config
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_blog_app', {useMongoClient: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

// Passport config
app.use(require('express-session')({
    secret: 'youwillneverwalkalone',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// App routes
app.use('/', blogs);
app.use('/user', user);

// App listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});