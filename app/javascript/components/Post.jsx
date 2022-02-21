import React from "react";
import { Link } from "react-router-dom";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: { body: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ post: response }))
      //.catch(() => this.props.history.push("/posts"));
  }
  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deletePost() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/posts/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/posts"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { post } = this.state;
    const postBody = this.addHtmlEntities(post.body);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <h1 className="display-4 position-relative text-white">
            {post.title}
          </h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2 text-center">{post.title}</h5>
              <div className="card mb-4 card-body"
                dangerouslySetInnerHTML={{
                  __html: `${postBody}`
                }} 
              />
            </div>
            
            <div className="col-sm-12 col-lg-7">
              <Link to={`/posts/${this.props.match.params.id}/edit`} className="btn btn-warning mr-2">
                Edit Post
              </Link>
              <button type="button" className="btn btn-danger" onClick={this.deletePost}>
                Delete Post
              </button>
            </div>
          </div>
          <Link to="/posts" className="btn btn-link">
            Back to posts
          </Link>
        </div>
      </div>
      
    );
  }
}

export default Post;