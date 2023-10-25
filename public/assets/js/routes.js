const express = require ('express');
const fs = require ('fs');

const PORT = process.env. PORT || 3001;

const app = express ()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

seeNotes
.addEventListener('submit', (e) => {
    e.preventDefault();
    
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, 'notes.html'));
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html' ));
});

app.get('/api/notes', (req, res) => res.json (noteData));

app.post('/api/notes', (req, res) => res.json(noteData));

