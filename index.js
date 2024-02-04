const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true })); //any form data that comes in from a form or post req, parse it
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //view engine set to ejs


//toDoList array
const toDoList = [
  {
    task: "clean dish",
  },
  {
    task: "clean dish",
  },
  {
    task: "clean dish",
  },
];


//upon receiving html get req, renders index with toDoList array
app.get("/index", (req, res) => {
  res.render("index", { toDoList });
});

//renders new page
app.get("/new", (req, res) => {
  res.render("new");
});

//receives post req matching /new path and process it and redirect to prevent double send
app.post("/new", (req, res) => {
  const { task } = req.body;
  toDoList.push({ task });
  res.redirect("/index");
});

app.listen(3000, (req, res) => {
  console.log("listening to port 3000");
});
