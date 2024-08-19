import express from "express";
import "dotenv/config";
const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Hello from express server ${port}`));

// Middleware ==> check
app.use(express.json());

//  GET Request ==> app.get

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Get Request" });
});

//  POST Request ==> app.post
app.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({ msg: "POST Request" });
});

//  PUt Request ==> app.put
app.put("/:id", (req, res) => {
  console.log(req.params);
  res.status(201).json({ id: req.params.id });
});
