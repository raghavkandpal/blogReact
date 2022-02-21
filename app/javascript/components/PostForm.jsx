import React from "react";
import { Link } from "react-router-dom";

export default function PostForm(props) {
    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new post to the blog.
              </h1>
              <form onSubmit={props.onSubmit}>
                <div className="form-group">
                  <label htmlFor="postTitle">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={props.post.title}
                    id="postTitle"
                    className="form-control"
                    required
                    onChange={props.onChange}
                  />
                </div>
                <label htmlFor="postBody">Body</label>
                <textarea
                  className="form-control"
                  name="body"
                  value={props.post.body}
                  id="postBody"
                  rows="5"
                  required
                  onChange={props.onChange}
                />
                <button type="submit" className="btn custom-button mt-3">
                  {props.button_label}
                </button>
                <Link to="/posts" className="btn btn-link mt-3">
                  Back to posts
              </Link>
              </form>
            </div>
          </div>
        </div>
      );
}