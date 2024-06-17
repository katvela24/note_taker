// Import Express.js
const express = require('express');
const fs = require ('fs');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

const path = './db/db.json';

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");

});

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

  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const parsedData = JSON.parse(data);
    let lastId = 0

    if (parsedData.length >0)
    lastId = parsedData[parsedData.length-1].id 
    
    let newNote = {

      title: req.body.title ,
      text: req.body.text,
      id: lastId+1
  
    }

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
});

app.delete("/api/notes/:id", async function (req, res) {
const id = parseInt(req.params.id)

  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const parsedData = JSON.parse(data);
    const updatedData = parsedData.filter(note => note.id !== id)  

   
    fs.writeFile(path, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
      res.end()
    });
  });
});
// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
