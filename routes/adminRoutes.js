const express       = require("express");
const router        = express.Router();     //Bu route'yi yani file'i extarct etmeye yarayacak..
const User          = require("../models/userModel");
const passport      = require("passport");
const Blog          = require("../models/blogModel");

let adminActions = [
    {
        actionId : 1,
        actionName : "editAbout",
        displayName : "Change About Page"
    },
    {
        actionId : 2,
        actionName : "editContact",
        displayName : "Change Contact Page"
    },
    {
        actionId : 3,
        actionName : "addNewBlog",
        displayName : "Add New Blog"
    },
    {
        actionId : 4,
        actionName : "listAllBlog",
        displayName : "List All Blog"
    },
    {
        actionId : 5,
        actionName : "editResume",
        displayName : "Change Resume"
    },
    {
        actionId : 6,
        actionName : "listAllMessages",
        displayName : "List All Message"
    }
];

router.get("/admin", isLoggedIn, (req, res) => {
    res.render("admin/admin", {adminActions : adminActions});
});

router.get("/signin", (req, res) => {
    res.render("admin/signin"); 
});

router.post("/signin", passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/signin"   
}), (req, res) => {

});

router.get("/signup", (req, res) => {
    res.render("admin/signup"); 
});

router.post("/signup", (req, res) => {
    let newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/")
            });
        }
    })
});

router.get("/signout", (req, res) => {
    req.logOut();
    res.redirect("/");
})

router.post("/home", (req, res) => {
    Blog.find({}, (err, foundBlogs) => { // find({}) -> Tum Bloglari Al
        if(err){
            console.log("================================ERROR ERROR ERROR================================ ");
            console.log(err);
        } else {
            console.log("================================ALL BLOGS================================ ");
            console.log(foundBlogs);
            res.render("home", {foundBlogs:foundBlogs});
        }
    })

     // bu saydaki degislen isim : alinacak degisken sayfadaki 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/sign");
    }
}

module.exports = router; // router'i disariya aktarabildik..