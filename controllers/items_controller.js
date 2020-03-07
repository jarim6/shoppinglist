const item_model = require('../models/items-model');
const item_views = require('../views/items-views');

const get_items = (req, res, next) => {
    const user = req.user;
    user.populate('items')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                items: user.items
            };
            console.log('testi')
            let html = item_views.items_view(data);
            res.send(html);
        });
};

const post_delete_item = (req, res, next) => {
    const user = req.user;
    const item_id_to_delete = req.body.item_id;

    //Remove item from user.items
    const updated_items = user.items.filter((item_id) => {
        return item_id != item_id_to_delete;
    });
    user.items = updated_items;

    //Remove item object from database
    user.save().then(() => {
        item_model.findByIdAndRemove(item_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_item = (req, res, next) => {
    const item_id = req.params.id;
    item_model.findOne({
        _id: item_id
    }).then((item) => {
        let data = {
            text: item.text
        };
        let html = item_views.item_view(data);
        res.send(html);
    });
};

const post_item = (req, res, next) => {
    const user = req.user;
    let new_item = item_model({
        text: req.body.item
    });
    new_item.save().then(() => {
        console.log('item saved');
        user.items.push(new_item);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_items = get_items;
module.exports.get_item = get_item;
module.exports.post_item = post_item;
module.exports.post_delete_item = post_delete_item;