import express from "express";
import "dotenv/config";
import fs from "fs";
const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Hello from express server ${port}`));

// Middleware ==> check
app.use(express.json());

//  GET Request ==> app.get

app.get("/", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) res.status(200).json({ data: JSON.parse(data) });
  });
  //   res.status(200).json({ msg: "Get Request" });
});

// get max id from list

//  POST Request ==> app.post
app.post("/", (req, res) => {
  //   console.log(req.body);
  fs.readFile("db.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const id = parsedData["last_id"] + 1;
    const users = parsedData["users"];
    const { name } = req.body;
    users.push({ id, name });
    fs.writeFile("db.json", JSON.stringify({ users, last_id: id }), (err) => {
      if (err) res.status(400).json({ err });

      res.status(200).json({ msg: "User added successfully" });
    });
  });
});

//  PUt Request ==> app.put
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ err });
    }
    if (data) {
      const parsedData = JSON.parse(data);
      const users = parsedData["users"];
      const userId = users.findIndex((e) => e.id == id);
      users[userId].name = name;

      //  update file after edit
      fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
        if (err) res.status(400).json({ err: "somthing wrong" });
        res.status(200).json({ msg: "User has been Updated" });
      });
    }
  });
});

//  Delete Request ==> app.delete
app.delete("/:id", (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err: "something wrong" });
    if (data) {
      const parsedData = JSON.parse(data);
      let users = parsedData["users"];
      const leftOvers = users.filter((e) => e.id != id);

      fs.writeFile(
        "db.json",
        JSON.stringify({ users: leftOvers, last_id: parsedData["last_id"] }),
        (err) => {
          if (err) res.status(400).json({ err: "somthig wrong" });
          res.status(200).json({ msg: "User Has been Deleted Succesfully " });
        }
      );
    }
  });
  // res.status(201).json({ id: req.params.id });
});
