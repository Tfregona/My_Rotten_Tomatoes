import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService, commentService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const router = useRouter();

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
    commentService.getAll().then((x) => setComments(x));
  }, []);

  if (userService.userValue?.role === "user") {
    router.push({
      pathname: "/",
    });
  }

  function deleteComment(id) {
    setComments(
      comments.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    commentService.delete(id).then(() => {
      setComments((comments) => comments.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Comments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Content</th>
            <th>Movie id</th>
            <th>User id</th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.content}</td>
                <td>{comment.movie_id}</td>
                <td>{comment.user_id}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/comments/edit/${comment.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={comment.isDeleting}
                  >
                    {comment.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!comments && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {comments && !comments.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No comments To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
