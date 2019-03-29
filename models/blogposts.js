var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    type: String
});

module.exports = mongoose.model("BlogPost", blogSchema);