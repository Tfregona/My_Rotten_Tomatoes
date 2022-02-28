import { apiHandler, commentsRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

function register(req, res) {
    const {...comment } = req.body;
    commentsRepo.create(comment);
    return res.status(200).json({});
}
