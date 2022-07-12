const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Complete Pending Project", "Wash the Car", "Pay the rent"];
const workItems = [];

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", {listTitle: day, newlistItems: items});
});

app.post("/", function(req, res){
  const item = req.body.newItem;
  if(req.body.newItem === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newlistItems: workItems});
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
