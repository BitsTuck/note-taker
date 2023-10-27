//All necessary Node packages and routes
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const noteData = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Connects index to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//retrieves existing note data
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).end(); 
      }
  
      const notes = JSON.parse(data);
      res.json(notes); 
    });
  });


//adds a new note by taking in the user input, calling the existing notes, adding the user input to the existing notes, and then re-writing the whole file to include both
app.post('/api/notes', (req, res) => {
    console.log(req.body)
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4()
    }
    fs.readFile('./db/db.json', 'utf8', (err, oldNotes) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(oldNotes);
            parsedNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(parsedNotes)
                }

            })
        }
    });
})





//Takes you to the index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




// app.delete('/api/notes:id', (req, res) => {
//     const {title, text} = req.body;
//     const deleteNote = {
//         title : '',
//         text: '',
//         id: '',
//     }
//     fs.readFile('./db/db.json', 'utf8', (err, oldNotes) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const parsedNotes = JSON.parse(oldNotes);
//             parsedNotes.slice(req.body);
//             fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),
//             (err) =>
//             err ? console.err(err) : res.json(parsedNotes))

//         }
//     })

// })

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})