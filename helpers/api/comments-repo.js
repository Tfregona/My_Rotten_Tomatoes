const fs = require('fs');

let comments = require('data/comments.json');
 
export const commentsRepo = {
    getAll: () => comments,
    getById: id => comments.find(x => x.id.toString() === id.toString()),
    find: x => comments.find(x),
    getAllById: id => comments.find(x => x.movie_id.toString() === id.toString()),
    create,
    update,
    delete: _delete
};

function create(comment) {
    // generate new comment id
    comment.id = comments.length ? Math.max(...comments.map(x => x.id)) + 1 : 1;
    comment.movie_id = parseInt(comment.movie_id);
    comment.user_id = parseInt(comment.user_id);
    // set date created and updated
    comment.dateCreated = new Date().toISOString();
    comment.dateUpdated = new Date().toISOString();

    // add and save comment
    comments.push(comment);
    saveData();
}

function update(id, params) {
    const comment = comments.find(x => x.id.toString() === id.toString());

    // set date updated
    comment.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(comment, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted comment and save
    comments = comments.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/comments.json', JSON.stringify(comments, null, 4));
}