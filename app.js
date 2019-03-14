var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.redirect("/theworldthroughmylenses");
});

app.get("/theworldthroughmylenses", function(req,res) {
    res.render("index.ejs");
})

app.listen(4200, function() {
    console.log("Server is running on PORT 4200!");
});