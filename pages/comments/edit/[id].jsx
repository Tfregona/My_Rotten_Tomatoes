import { useState, useEffect } from 'react';

import { Layout, AddEditComment } from 'components/comments';
import { Spinner } from 'components';
import { commentService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [comment, setComment] = useState(null);

    useEffect(() => {
        commentService.getById(id)
            .then(x => setComment(x))
            .catch(alertService.error)
    }, []);

    return (
        <Layout>
            <h1>Edit Comment</h1>
            {comment ? <AddEditComment comment={comment} /> : <Spinner /> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
