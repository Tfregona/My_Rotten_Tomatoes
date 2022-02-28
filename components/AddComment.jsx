import React from "react";
import { userService, commentService, alertService } from "services";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const AddComment = ({ id }) => {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const formOptions = { resolver: yupResolver(validationSchema) };
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function onSubmit(comment) {
    return commentService
      .register(comment)
      .then(() => {
        alertService.success("Registration successful", {
          keepAfterRouteChange: true,
        });
      })
      .catch(alertService.error);
  }
  return (
    <div>
      {user ? (
        <div className="card">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-7">
              <div className="comment-box ml-2">
                <h4>Add a comment on movie :</h4>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="comment-area">
                  <textarea
                    name="content"
                    {...register("content")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Your comment"
                    rows="4"
                  ></textarea>
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                  <div className="hidden">
                    <input
                      value={id}
                      name="movie_id"
                      {...register("movie_id")}
                    />
                    <input
                      value={userService.userValue?.id}
                      name="user_id"
                      {...register("user_id")}
                    />
                  </div>
                </div>
                <div className="comment-btns mt-2">
                  <div className="row">
                    <div className="col-2">
                      <button className="btn btn-success btn-sm">Cancel</button>
                    </div>
                    <div className="col-2">
                      <button
                        disabled={formState.isSubmitting}
                        className="btn btn-success send btn-sm"
                      >
                        {formState.isSubmitting && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Send
                        <i className="fa fa-long-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You need to be logged to comment !</p>
          <a href="/account/login">Sign in</a>
        </div>
      )}
    </div>
  );
};
