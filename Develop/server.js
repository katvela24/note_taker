// Import Express.js
import express from 'express';
import fs from 'fs';

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Static middleware pointing to the public folder
app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// app.get("/send", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/sendFile.html"))
// );

// An import assertion in a static import
import db from "./db/db.json" assert { type: "json" };
console.log("test", db);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", async function (req, res) {
  const notes = await db;
  return res.json(notes)
}
);

app.post("/api/notes", async function (req, res) {
  const notes = await db;
  let newNote = {

    title: req.body.title ,
    text: req.body.text

  }
  // TODO: This is where I would add the data to the file
  
  // return res.json(notes)
}
);

// const apiRoutes = require(".routes/apiRoutes")
// app.use("/api", apiRoutes)

// const htmlRoutes = require(".routes/htmlRoutes")
// app.use("/", htmlRoutes)

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
