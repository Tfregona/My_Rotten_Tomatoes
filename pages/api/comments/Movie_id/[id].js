import { apiHandler } from 'helpers/api';
import { commentsRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getAllById
});

function getAllById(req, res) {
    const comment = commentsRepo.getAllById(req.query.id);

    if (!comment) throw 'Comment Not Found';

    return res.status(200).json(omit(comment, 'hash'));
}