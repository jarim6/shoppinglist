const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const list_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});
const list_model = new mongoose.model('list', list_schema);

module.exports = list_model;