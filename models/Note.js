const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new mongoose.Schema({
    // user: fetch notes only that are associated to particular user and 
    // REF is the model that is used to give reference
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

  })

  module.exports = mongoose.model('note',NotesSchema)