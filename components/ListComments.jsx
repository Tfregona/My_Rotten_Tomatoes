import React from "react";
import { useState, useEffect } from "react";
import { commentService, userService } from "services";

const ListComments = ({ movie_id }) => {
  const [comments, setComments] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    commentService.getAllById(movie_id).then((x) => setComments(x));
    if (comments) {
      userService.getById(parseInt(comments.user_id)).then((x) => setAuthor(x));
      console.log('comments.user_id')
      console.log(author)
    }
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        {comments ? (
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Recent Comment</h4>
                </div>
                <div className="comment-widgets m-b-20">
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2">
                      <span className="round">
                        <img
                          src="https://i.imgur.com/uIgDDDd.jpg"
                          alt="user"
                          width="50"
                        />
                      </span>
                    </div>
                    <div className="comment-text w-100">
                      <div className="comment-footer">
                        <span className="date">{comments.dateCreated}</span>
                        <span className="action-icons">
                          <a href="#" data-abc="true">
                            <i className="fa fa-pencil"></i>
                          </a>
                          <a href="#" data-abc="true">
                            <i className="fa fa-rotate-right"></i>
                          </a>
                          <a href="#" data-abc="true">
                            <i className="fa fa-heart"></i>
                          </a>
                        </span>
                      </div>
                      <p className="m-b-4 m-t-7">{comments.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Be the first one to comment !</p>
        )}
      </div>
    </>
  );
};

export default ListComments;
