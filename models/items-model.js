const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        req: true
    },
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        req: true
    }]
});
const item_model = mongoose.model('item', item_schema);

module.exports = item_model;
