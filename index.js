const express = require("express");
const app = express();
const path = require("path");

const { v4: uuidv4 } = require("uuid");
uuidv4();

app.use(express.urlencoded({ extended: true })); //any form data that comes in from a form or post req, parse it
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //view engine set to ejs

//toDoList array
const toDoList = [
  {
    id: uuidv4(),
    task: "clean dish",
  },
];

//upon receiving html get req, renders index with toDoList array
app.get("/comments", (req, res) => {
  res.render("comments", { toDoList });
});

//renders new page
app.get("/new", (req, res) => {
  res.render("new");
});

//render edit page
app.get('/edit/:id', (req,res)=>{
  res.render("edit", {toDoList})
})





//receives post req matching /new path and process it and redirect to prevent double send
app.post("/new", (req, res) => {
  console.log(req)
  if (req.body.task === "") {
    throw "enter task";
  } else {
    const { task } = req.body;
    toDoList.push({ task, id: uuidv4() });
    res.redirect("/index");
  }
});



app.listen(3000, (req, res) => {
  console.log("listening to port 3000");
});
