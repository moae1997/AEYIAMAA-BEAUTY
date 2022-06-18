const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {check, validationResult} = require("express-validator");

const app = express();


mongoose.connect("mongodb://localhost:27017/styleDB");

const reviewSchema = {
    name: String,
    review: Array,
}

const Review = mongoose.model("Review", reviewSchema);


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const comments = ["Client Reviews Will Show Here"]

app.get("/", function(req, res){
    Review.findOne({name: "Review"}, function(err, found){
        if (found == null) {
           res.render("home", {review: comments});
        } else {
           const rev = found.review;
           const rate = found.review.rate;
           res.render("home", {review: rev});
        }   
   });
});

app.get("/services", function(req, res){
    res.render("services");
});
app.get("/booking", function(req, res){
    res.render("booking");
});

app.post("/reviews", check("rate").exists(), check("rating").exists(), function(req, res){

    const error = validationResult(req);
    if(!error.isEmpty()) { 
        res.redirect("/");
        return;
    } else {
        const rate = req.body.rating;
        const rev = [req.body.rate, rate];
        const rev2 = [[req.body.rate, rate]]; 

    Review.findOne({name: "Review"}, function(err, found){
           if (found == null) {
            Review.insertMany({review: rev2, name: "Review"},function(err){
                res.redirect("/#reviews");
            });
           } else {
                found.review.push(rev);
                found.save();
                res.redirect("/#reviews");
           }
    }); 
   }   
});

app.listen(4000, function(req, res){
    console.log("It's Time to Shine!");
});