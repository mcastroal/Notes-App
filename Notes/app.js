const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk');

//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add', 
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Removes one note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create remove-all command
yargs.command({
    command: 'remove-all',
    describe: 'Removes all notes',
    handler() {
        notes.removeAllNotes()
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'Lists the titles of all notes',
    handler() {
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Takes a title and displays contents',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//Create edit command
yargs.command({
    command: 'edit',
    describe: 'Takes title and a new string, replaces original note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.editNote(argv.title, argv.body)
    }
})

//console.log(process.argv)
console.log(yargs.argv)
