const express = require("express");
const { append } = require("express/lib/response");
const exp = express();
const port = process.env.PORT || 8000;
const path = require("path");
const publicpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
const hbs = require("hbs");

hbs.registerPartials(partialspath);

exp.set("views", viewspath);

exp.set("view engine", "hbs");

exp.use(express.json());
exp.use(express.urlencoded({ extended: false }));

require("./db/conn");

const register = require("./models/register");
const async = require("hbs/lib/async");

exp.use(express.static(publicpath));

exp.get("/", (req, res) => {
  res.render("index");
});

exp.get("/login", (req, res) => {
  res.render("login");
});

exp.get("/register", (req, res) => {
  res.render("register");
});

exp.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registertt = new register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender.value,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });

      const registered = await registertt.save();
      res.status(201).render("index");
    } else {
      res.send("passwords are not matching");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

exp.get("/", (req, res) => {
  res.send("JS File");
});

exp.listen(port);
