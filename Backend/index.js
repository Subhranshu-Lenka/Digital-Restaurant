import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectDB.js";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello User!");
});

// const customDB = mongoose.connection.useDb("restaurant1");
// console.log(customDB);
// const userSchema = new mongoose.Schema({}, { strict: false });
// const User = customDB.model("User", userSchema, "users");
// app.get("/users", async (req, res) => {
//   const users = await User.find({});
//   return res.send(users);
// });

const Port = process.env.PORT ;
connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log("Express App is listening on Port ", Port);
    });
  })
  .catch((err) => console.log("Connection Error: ", err));
