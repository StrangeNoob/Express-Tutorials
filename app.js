const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("60ba0e3610c8f4358d30dee8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/shop", { useNewUrlParser: true })
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "John Doe",
          email: "john@doe.com",
          cart: {
            items: [],
          },
        });
        return user.save();
      }
    });
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
