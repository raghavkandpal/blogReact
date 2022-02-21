import React from "react";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";

class EditPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        body: ''
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
  
    stripHtmlEntities(str) {
      return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    onSubmit(event) {
      event.preventDefault();
      const { title, body } = this.state;

      if (title.length ===0 || body.length ===0)
          return;
  
      const url = `/api/v1/posts/${this.props.match.params.id}`;
  
      const data = {
        post: {
          title,
          body
        }
      };
  
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/posts/${response.id}`))
        .catch(error => console.log(error.message));
    }
  
    componentDidMount() {
      const url = `/api/v1/posts/${this.props.match.params.id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ ...response }))
        .catch(() => this.props.history.push("/posts"));
    }
  
    render() {
      return (
        <PostForm onSubmit={this.onSubmit} onChange={this.onChange} post={this.state} button_label="Update Post" />
      );
    }
  }
  
  export default EditPost;