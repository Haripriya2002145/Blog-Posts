const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("public/assets"));

const homeStartingContent = "This is the home starting content. I want to start a day with freshness. I want to remind myself of the days when I got expected results for that hard work. But also want to remind myself of the hard work I have to do to achieve them. Let's start with mindful quotes for the day.";
const aboutStartingContent = "I am Haripriya from Chennai, studying at SRM Institute of Science and Technology. I'm pursuing my bachelor course in Computer Science Engineering.";
const contactStartingContent = "Use this ID to contact me.";

let posts = [];

app.get("/", function (req, res) {
    res.render("home", { homeText: homeStartingContent, allPosts: posts });
})

app.get("/home", function (req, res) {
    res.render("home", { homeText: homeStartingContent, allPosts: posts });
})

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutStartingContent, imgSrc: "pic.png" });
})

app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactStartingContent });
})

app.get("/compose", function (req, res) {
    res.render("compose");
})

app.post("/compose", (req, res) => {
    const title = req.body.postTitle;
    const content = req.body.postBody;
    

    const post = {
        title1: title,
        content1: content
    }

    posts.push(post);
    console.log(posts);

    res.redirect("/");
})


app.get("/posts/:postName", (req, res) => {

    const requestedTitle = _.lowerCase(req.params.postName);
    
    var matched=0;
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title1);
        
        if (requestedTitle === storedTitle) {
            //console.log("Match found!");
            //res.redirect("/");
            matched=1;
            console.log("Match found!");
            res.render("post", {postTitle: post.title1, postContent: post.content1});
        }
    }
    );

    if(matched==0){
        console.log("Match not found!");
        
        res.redirect("/");
    }
})





app.listen(8000, () => {
    console.log("Server started on port 8000");
})

