import express from "express";
import path from "path";

const app = express();

app.use(express.json())

const data = {
  satCount: 0,
};

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("pages/index", data);
});

app.post("/update", (req, res, next) => {
  console.log(req.body);
  data.satCount++;
  res.send("OK");
});

app.post("/a0", (req, res, next) => {
  console.log(req.body);
  data.satCount++;
  res.send("OK");
});

app.listen(5000, () => {
  console.log("server is listing on port 5000");
});
