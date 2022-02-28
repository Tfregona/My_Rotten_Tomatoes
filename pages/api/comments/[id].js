import { apiHandler } from 'helpers/api';
import { commentsRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const comment = commentsRepo.getById(req.query.id);

    if (!comment) throw 'Comment Not Found';

    return res.status(200).json(omit(comment, 'hash'));
}

function update(req, res) {
    const comment = commentsRepo.getById(req.query.id);

    if (!comment) throw 'Comment Not Found';

    // split out password from user details 
    const { password, ...params } = req.body;

    commentsRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    commentsRepo.delete(req.query.id);
    return res.status(200).json({});
}
