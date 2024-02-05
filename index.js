const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require("uuid");
uuidv4();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); //any form data that comes in from a form or post req, parse it
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //view engine set to ejs

//toDoList array
let toDoList = [
  {
    id: uuidv4(),
    task: "clean dish",
  },
];

//upon receiving html get req matching /comments route, renders index with toDoList array
app.get("/comments", (req, res) => {
  res.render("comments/index", { toDoList });
});

//renders new page
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

//receives post req matching /comments route and process it and redirect to prevent double send
app.post("/comments", (req, res) => {
  if (req.body.task === "") {
    throw "enter task";
  } else {
    const { task } = req.body;
    toDoList.push({ task, id: uuidv4() });
    res.redirect("/comments");
  }
});

//render detail page
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = toDoList.find((i) => i.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = toDoList.find((i) => i.id === id);
  res.render("comments/edit", { comment });
});

//update comment
app.patch("/comments/:id", (req, res) => {
  // console.log("hello")

  const { id } = req.params;
  const newCommentText = req.body.comment;
  const comment = toDoList.find((i) => i.id === id);
  comment.task = newCommentText;
  res.redirect("/comments");
});

app.listen(3000, (req, res) => {
  console.log("listening to port 3000");
});
