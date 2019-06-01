var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    expressSanitizer        = require("express-sanitizer"),
    BlogPost                = require("./models/blogposts"),
    passport                = require("passport");
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true});

// APP CONFIGURATION
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Passport and User Auth
app.use(require("express-session")({
    secret: "Test Secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Other
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//==================================================
// ROUTES
//==================================================

//INDEX ROUTE REDIRECT - Redirect to the index page
app.get("/", function(req, res) {
    res.redirect("/blogposts");
});

// INDEX PAGE - Show all blog posts  
app.get("/blogposts", function(req,res) {
    //Get all blogposts from the DB
    BlogPost.find({}, function(err, blogposts) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {blogPosts: blogposts});
        }
    });
});

// CREATE - Add new blog post to the DB
app.post("/blogposts", function(req, res) {
    // var title = req.body.title;
    // var image = req.body.image;
    // var content = req.body.content;
    // var type = req.body.type;
    // var newBlogPost = {
    //     title: title,
    //     image: image,
    //     content: content,
    //     type: type 
    // }

    req.body.blogpost.content=req.sanitize(req.body.blogpost.content);
    //Create a new blogpost and save to database
    BlogPost.create(req.body.blogpost, function(err, newBlogPost) {
        if(err) {
            console.log(err);
        }
        else {
            // console.log(req.body.blogpost.type);
            res.redirect("/blogposts");
        }
    });
});

// NEW - Show form to create new blog post
app.get("/blogposts/new", function(req,res) {
    res.render("new");
});

// SHOW - Show a single blog post in more detail 
app.get("/blogposts/:id", function(req, res) {
    //find the blogpost with the given id
    BlogPost.findById(req.params.id, function(err, foundBlogPost) {
        if(err) {
            console.log(err);
        }
        else {
            //render show template with that blogpost 
            res.render("show", {blogPost: foundBlogPost});
        }
    });
});

// EDIT ROUTE - Edit an existing blog post
app.get("/blogposts/:id/edit", function(req, res) {
    BlogPost.findById(req.params.id, function(err, foundBlogPost) {
        if(err) {
            console.log(err);
        }
        else {
            //render show template with that blogpost 
            res.render("edit", {blogPost: foundBlogPost});
        }
    });
});

// UPDATE ROUTE - Update an existing blog 
app.put("/blogposts/:id", function(req, res) {
    req.body.blogpost.content=req.sanitize(req.body.blogpost.content);
    BlogPost.findByIdAndUpdate(req.params.id, req.body.blogpost, function(err, updatedBlogPost) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogposts/" + req.params.id);
        }
    });
});

// DELETE ROUTE - Delete an existing blog
app.delete("/blogposts/:id", function(req, res) {
    BlogPost.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogposts");
        }
    });
});

// USER/ADMIN REGISTRATION 
// GET - Show sign up form 
app.get("/userregister", function(req, res) {
    res.render("userregister");
});

// POST - Add user 
app.post("/userregister", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("userregister")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    })
    
});

// USER LOGIN

// GET - Show login up form 
app.get("/login", function(req, res) {
    res.render("login");
});

// POST - Add user 
app.post("/login", passport.authenticate("local", 
    {   
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res) {
});

// USER LOGOUT 

// GET - Logout Function
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// USER PORTAL PAGE

app.get("/userportal", function(req, res) {
    res.render("userportal");
});



app.listen(4200, function() {
    console.log("Server is running on PORT 4200!");
});