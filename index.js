import express from "express";
import "dotenv/config";
const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Hello from express server ${port}`));

//  GET Request ==> app.get

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Get Request" });
});

//  POST Request ==> app.post
