"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const PORT = process.env.PORT || 8080;

const app = express();

const dogsDB = {
  "6021a81c-1970-4cfb-9697-26111827d510": { name: "Gabriel" },
  "b84e65d0-fc55-4d86-a2be-57f60cd57b96": { name: "Sherman" },
  "6f9a926d-2fef-4cf5-9680-374da515d625": { name: "Theo" }
};

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Index - GET /dogs
app.get("/dogs", (req, res) => {
  res.render("dogs/index", {
    dogs: dogsDB
  });
});

// New - GET /dogs/new
app.get("/dogs/new", (req, res) => {
  res.render("dogs/new");
});

// Show - GET /dogs/:id
app.get("/dogs/:id", (req, res) => {
  const id = req.params.id;
  const dog = dogsDB[id];

  if (dog) {
    res.render("dogs/show", { dog: dog });
  } else {
    res.status(404);
    res.render("dogs/404");
  }
});

// Create - POST /dogs
app.post("/dogs", (req, res) => {
  // "name=Wyatt&owner=Amy"
  // { name: "Wyatt", owner: "Amy" }
  const name = req.body.name;
  const id = uuid();
  const dog = { name: name };
  dogsDB[id] = dog;

  res.redirect(`/dogs/${id}`);
});

// Edit - GET /dogs/:id/edit
app.get("/dogs/:id/edit", (req, res) => {
  const id = req.params.id;
  const dog = dogsDB[id];

  if (dog) {
    res.render("dogs/edit", { id: id, dog: dog });
  } else {
    res.status(404);
    res.render("dogs/404");
  }
});

// Update - POST /dogs/:id
app.post("/dogs/:id", (req, res) => {
  const id = req.params.id;
  const dog = dogsDB[id];

  if (dog) {
    dog.name = req.body.name;
    res.redirect(`/dogs/${id}`);
  } else {
    res.redirect("/dogs");
  }
});

app.post("/dogs/:id/delete", (req, res) => {
  const id = req.params.id;
  const dog = dogsDB[id];

  if (dog) {
    delete dogsDB[id];
  }

  res.redirect("/dogs");
});

app.get("/demo", (req, res) => {
  res.send(`
      <div>Hello, World!</div>
  `);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
