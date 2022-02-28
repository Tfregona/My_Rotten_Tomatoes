import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
 
import { Link } from "components";
import { commentService, alertService } from "services";

export { AddEditComment };

function AddEditComment(props) {
  const comment = props?.comment;
  const isAddMode = !comment;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content Name is required")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.comment;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createComment(data) : updateComment(comment.id, data);
  }

  function createComment(data) {
    return commentService
      .register(data)
      .then(() => {
        alertService.success("Comment added", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updateComment(id, data) {
    return commentService
      .update(id, data)
      .then(() => {
        alertService.success("Comment updated", { keepAfterRouteChange: true });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Content</label>
          <input
            name="content"
            type="text"
            {...register("content")}
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.content?.message}</div>
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/users" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
