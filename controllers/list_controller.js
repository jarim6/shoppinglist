const list_model = require('../models/list-model');
const list_views = require('../views/list-views');

const get_lists = (req, res, next) => {
    const user = req.user;
    user.populate('lists')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                lists: user.lists
            };
            let html = list_views.lists_view(data);
            res.send(html);
        });
};

const post_delete_list = (req, res, next) => {
    const user = req.user;
    const list_id_to_delete = req.body.list_id;

    //Remove list from user.lists
    const updated_lists = user.lists.filter((list_id) => {
        return list_id != list_id_to_delete;
    });
    user.lists = updated_lists;

    //Remove list object from database
    user.save().then(() => {
        list_model.findByIdAndRemove(list_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_list = (req, res, next) => {
    const list_id = req.params.id;
    list_model.findOne({
        _id: list_id
    }).then((list) => {
        let data = {
            text: list.text
        };
        let html = list_views.list_view(data);
        res.send(html);
    });
};

const post_list = (req, res, next) => {
    const user = req.user;
    let new_list = list_model({
        text: req.body.list
    });
    new_list.save().then(() => {
        console.log('list saved');
        user.lists.push(new_list);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_lists = get_lists;
module.exports.get_list = get_list;
module.exports.post_list = post_list;
module.exports.post_delete_list = post_delete_list;