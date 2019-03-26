var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true});

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    type: String
});

var BlogPost = mongoose.model("BlogPost", blogSchema);

// var firstPost = new BlogPost ({
//     title: "First Post",
//     image: "https://images.unsplash.com/photo-1552416737-ec2f4962512e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
//     content: "Curabitur tempus vitae justo sit amet tristique. Sed iaculis justo mi, quis feugiat elit condimentum convallis. Aliquam a condimentum diam, at dignissim lectus. Nulla facilisi. Curabitur tincidunt risus id eros faucibus, quis pharetra justo fringilla. Fusce non commodo odio, in condimentum sapien. Duis blandit et erat ac volutpat. Sed blandit sit amet enim vitae vestibulum. Integer facilisis lacus urna, blandit sagittis orci aliquet ut. Aliquam eget orci sit amet mauris malesuada faucibus eget rutrum diam. Phasellus faucibus vulputate felis, in facilisis ipsum lacinia vel. Vivamus quis porttitor purus.",
//     type: "Text"
// });

// BlogPost.create(
//     {
//         title: "Third Post", image: "https://images.unsplash.com/photo-1553352797-aead1c0defc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80", content: "Nulla eget placerat enim. Donec consectetur tincidunt elit, non mollis libero laoreet in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum a placerat velit. Suspendisse ultricies nulla lorem, nec varius nunc placerat at. Aenean elit metus, cursus mattis congue et, vestibulum non lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque viverra, purus elementum venenatis molestie, ipsum mauris varius purus, vitae viverra ante justo id orci.",
//         type: "Text"
//     },
//     function(err, blogpost) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("ADDED NEW BLOGPOST!");
//             console.log(blogpost);
//         }
//     });


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

// var blogPosts = [
//     {title: "Latest Post", image: "https://images.unsplash.com/photo-1552323543-4cffa4ffffe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, quam id sagittis placerat, nibh orci feugiat felis, at varius velit est vel nibh. Quisque eget nunc consectetur, tincidunt orci vitae, ultricies tellus. Mauris et ipsum vehicula, facilisis ante tincidunt, accumsan leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi blandit sem diam, ac ultrices nulla porttitor et. Donec ac consequat eros. Phasellus a velit libero. Integer eu enim eget ante luctus imperdiet non vel diam. Suspendisse ultrices purus sit amet dolor fermentum dictum sit amet ac quam. Donec tincidunt magna in turpis ornare bibendum. Sed iaculis, elit fringilla molestie consectetur, lectus sem aliquam orci, et elementum enim dolor vel magna."},
//     {title: "First Post", image: "https://images.unsplash.com/photo-1552416737-ec2f4962512e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Curabitur tempus vitae justo sit amet tristique. Sed iaculis justo mi, quis feugiat elit condimentum convallis. Aliquam a condimentum diam, at dignissim lectus. Nulla facilisi. Curabitur tincidunt risus id eros faucibus, quis pharetra justo fringilla. Fusce non commodo odio, in condimentum sapien. Duis blandit et erat ac volutpat. Sed blandit sit amet enim vitae vestibulum. Integer facilisis lacus urna, blandit sagittis orci aliquet ut. Aliquam eget orci sit amet mauris malesuada faucibus eget rutrum diam. Phasellus faucibus vulputate felis, in facilisis ipsum lacinia vel. Vivamus quis porttitor purus."},
//     {title: "Second Post", image: "https://images.unsplash.com/photo-1552432134-191ce4bdf1f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Praesent in odio non odio sodales venenatis. Aenean rutrum faucibus efficitur. Morbi euismod neque augue, non finibus enim faucibus nec. Maecenas gravida, risus ut interdum rutrum, libero sapien accumsan eros, sit amet cursus sem est accumsan magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a blandit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce convallis ut turpis in vulputate. Quisque nibh metus, rhoncus at aliquam ut, hendrerit at arcu. Nunc lobortis ligula ac ullamcorper efficitur. Duis massa felis, ultrices vel elit et, ultricies blandit diam. Praesent pellentesque laoreet vehicula. Nunc ante nibh, sagittis in libero sed, porta accumsan enim. Aliquam laoreet quam ut purus efficitur efficitur."}
// ];


//==================================================
//ROUTES
//==================================================

//INDEX ROUTE REDIRECT - Redirect to the index page
app.get("/", function(req, res) {
    res.redirect("/blogposts");
});

//INDEX PAGE - Show all blog posts  
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
    var title = req.body.title;
    var image = req.body.image;
    var content = req.body.content;
    var type = req.body.type;
    var newBlogPost = {
        title: title,
        image: image,
        content: content,
        type: type 
    }
    //Create a new blogpost and save to database
    BlogPost.create(newBlogPost, function(err, newBlogPost) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogposts");
        }
    });
});

// NEW - Show form to create new blog post
app.get("/blogposts/new", function(req,res) {
    res.render("new");
});

//SHOW - Show a single blog post in more detail 
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

app.listen(4200, function() {
    console.log("Server is running on PORT 4200!");
});