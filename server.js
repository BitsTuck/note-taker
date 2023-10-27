const express = require ('express');
const fs = require ('fs');
const {v4: uuidv4} = require ('uuid');
const path = require ('path');
const noteData = require ('./db/db.json')

const PORT = process.env. PORT || 3001;

const app = express ()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    console.log('line 15 hit')
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json (noteData));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html' ));
});



app.post('/api/notes', (req, res) => {
    console.log(req.body)
    const {title, text} = req.body;
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
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),
            (err) =>
            err ? console.err(err) : res.json(parsedNotes))
            
        }
    })
});

app.delete('/api/notes', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})