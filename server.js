// Import Express.js
const express = require('express');
const fs = require ('fs');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
// import path from 'path';
// import { fileURLToPath } from 'url';

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static("public"));
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// app.get("/send", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/sendFile.html"))
// );


// An import assertion in a static import
// import db from "./db/db.json" assert { type: "json" };
// console.log("test", db);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  // res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");

});

const path = './db/db.json';
app.get("/api/notes", function (req, res) {
  fs.readFile(path, function (err,data){
    if (err) {
      return console.log(err)
    }
  
    res.json (JSON.parse (data))
  })
}
);

app.post("/api/notes", async function (req, res) {
 
  let newNote = {

    title: req.body.title ,
    text: req.body.text

  }
  console.log(req.body, newNote)

  
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const parsedData = JSON.parse(data);
    
    parsedData.push(newNote);
    console.log("parsed data", parsedData);

    fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
      res.end()
    });
  });
  // console.log("new note", newNote);

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
