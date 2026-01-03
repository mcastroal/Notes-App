const fs = require('fs')
const chalk = require('chalk')

// Add Note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    
    debugger

    if (!duplicateNote) {
        notes.push({
        title: title,
        body: body
    })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Remove Note
const removeNote = (title) => {
     const notes = loadNotes()
     const notesToKeep = notes.filter((note) => note.title !== title)

     if (notes.length > notesToKeep.length) {
         console.log(chalk.green.inverse('Note removed!'))
         saveNotes(notesToKeep)
     } else {
         console.log(chalk.red.inverse('No note found!'))
     }
}

// Remove All Notes
const removeAllNotes = () => {
    saveNotes([])
    console.log(chalk.green.inverse('All notes removed!'))
}

// List Notes
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)        
    })
}

// Read Notes
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// Edit Notes
const editNote = (title, body) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (!note) {
        console.log(chalk.red.inverse('Note not found!'))
        return
    } 
    note.body = body
    saveNotes(notes)
    console.log(chalk.green.inverse('Note updated!'))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    removeAllNotes: removeAllNotes,
    editNote: editNote
}