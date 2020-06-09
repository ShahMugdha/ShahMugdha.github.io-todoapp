const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    'mongodb+srv://MugdhaShah:mugdha123@cluster0-ms17e.mongodb.net/note-taker?retryWrites=true&w=majority"',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB connected"));

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Todos APP",
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
