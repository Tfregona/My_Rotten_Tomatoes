import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/comments`;
const commentSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('comment')));

export const commentService = {
    comment: commentSubject.asObservable(),
    get commentValue () { return commentSubject.value },
    register,
    getAll,
    getAllById,
    getById,
    update,
    delete: _delete
};

function register(comment) {
    return fetchWrapper.post(`${baseUrl}/register`, comment);
}
function getAll() {
    return fetchWrapper.get(baseUrl);
}
function getAllById(id) {
    return fetchWrapper.get(`${baseUrl}/Movie_id/${id}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            return x;
        });
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
