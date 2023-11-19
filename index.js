const express = require("express");
const app = express();

const User = require("./models/user");
const { connectDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

connectDb("mongodb://127.0.0.1:27017/project2").then(() => {
    console.log("MONGO DB CONNECTED");
});

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`HEY! We are on ${PORT}`);
});
