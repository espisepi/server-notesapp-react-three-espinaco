const { Schema, model } = require('mongoose');

const NoteSchema = Schema({
    content: {
        type: String,
        required: true
    }
});

NoteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Note', NoteSchema );

