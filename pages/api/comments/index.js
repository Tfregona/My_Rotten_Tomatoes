import { apiHandler, commentsRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getComments
});

function getComments(req, res) {
    // return users without hashed passwords in the response
    const response = commentsRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}
 