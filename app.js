var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.redirect("/theworldthroughmylenses");
});

app.get("/theworldthroughmylenses", function(req,res) {
    var blogPosts = [
        {title: "Latest Post", image: "https://images.unsplash.com/photo-1552323543-4cffa4ffffe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, quam id sagittis placerat, nibh orci feugiat felis, at varius velit est vel nibh. Quisque eget nunc consectetur, tincidunt orci vitae, ultricies tellus. Mauris et ipsum vehicula, facilisis ante tincidunt, accumsan leo. Interdum et malesuada fames ac ante ipsum primis in faucibus.", quote:"", postType: ""},
        {title: "First Post", image: "https://images.unsplash.com/photo-1552416737-ec2f4962512e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Curabitur tempus vitae justo sit amet tristique. Sed iaculis justo mi, quis feugiat elit condimentum convallis. Aliquam a condimentum diam, at dignissim lectus. Nulla facilisi. Curabitur tincidunt risus id eros faucibus, quis pharetra justo fringilla. Fusce non commodo odio, in condimentum sapien. Duis blandit et erat ac volutpat.", quote: "", postType: ""},
        {title: "Second Post", image: "https://images.unsplash.com/photo-1552432134-191ce4bdf1f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Praesent in odio non odio sodales venenatis. Aenean rutrum faucibus efficitur. Morbi euismod neque augue, non finibus enim faucibus nec. Maecenas gravida, risus ut interdum rutrum, libero sapien accumsan eros, sit amet cursus sem est accumsan magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a blandit purus.", quote: "", postType: ""},
        {title: "First Post", image: "https://images.unsplash.com/photo-1552416737-ec2f4962512e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Curabitur tempus vitae justo sit amet tristique. Sed iaculis justo mi, quis feugiat elit condimentum convallis. Aliquam a condimentum diam, at dignissim lectus. Nulla facilisi. Curabitur tincidunt risus id eros faucibus, quis pharetra justo fringilla. Fusce non commodo odio, in condimentum sapien. Duis blandit et erat ac volutpat.", quote: "", postType: ""},
        {title: "Second Post", image: "https://images.unsplash.com/photo-1552432134-191ce4bdf1f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Praesent in odio non odio sodales venenatis. Aenean rutrum faucibus efficitur. Morbi euismod neque augue, non finibus enim faucibus nec. Maecenas gravida, risus ut interdum rutrum, libero sapien accumsan eros, sit amet cursus sem est accumsan magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a blandit purus.", quote: "", postType: ""},
        {title: "Second Post", image: "https://images.unsplash.com/photo-1552432134-191ce4bdf1f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60", content: "Praesent in odio non odio sodales venenatis. Aenean rutrum faucibus efficitur. Morbi euismod neque augue, non finibus enim faucibus nec. Maecenas gravida, risus ut interdum rutrum, libero sapien accumsan eros, sit amet cursus sem est accumsan magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a blandit purus.", quote: "", postType: ""}
    ];
    res.render("index.ejs", {blogPosts: blogPosts});
});

app.post("/theworldthroughmylenses/addpost", function(req, res) {
    console.log(req.body);
    res.redirect("/");
});

app.listen(4200, function() {
    console.log("Server is running on PORT 4200!");
});