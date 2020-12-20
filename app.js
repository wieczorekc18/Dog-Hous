const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const reminders = require("./routes/api/reminders");
const User = require("./models/User")
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require("path");

app.use(passport.initialize());

require('./config/passport')(passport);

mongoose
.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
    console.log("failed to connect to mongo") 
    console.log(err)
});

app.use(bodyParser.urlencoded({
    extended: false
}))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(bodyParser.json())



// app.get("/", (req, res) => {
//     const user = new User({
//         username: "Bob",
//         number: "8001234567",
//         password: "bobjohnson12"
//     })
//     user.save();
//     res.send("Hello World!");
// });

app.use("/api/users", users);
app.use("/api/reminders", reminders);


const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`listening on port ${port}`)});

