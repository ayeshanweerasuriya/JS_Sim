require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');

// connects to mongodb
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.aphbi70.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Database connected successfully"), app.listen(3000);
  })
  .catch((err) => console.log("Database connection error:", err));

const app = express();

// register vue engine
app.set("view engine", "ejs");

// make the public folder public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
