import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { firestore } from "../../firebase";

import "./AddNew.scss";

import withUser from "components/hocs/WithUser";

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err:null,
      itemSaved: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () =>{
    const {user:{displayName}} = this.props;
    
    firestore.collection('drinks')
    .add(
      {
        author:displayName,
        ...this.state
      }
    )
    .then(resp => {
      this.setState({itemSaved:true})
    })
    .catch(err => this.setState({err:err}))
  }

  render() {
    const { user } = this.props;
    const { err, itemSaved } = this.state;
    if (!user) {
      return <Redirect to="/" />;
    } else if (itemSaved){
      return (
        <div>
        <h2>Recipe saved successfully!</h2>
        <div className="c-btn__container">
          <Link className="c-btn__item" to={`/list`}>
            Go back to list...
          </Link>
        </div>
        </div>
      );
    } else if (err) {
      return <h2>Oops! something went wrong! {err}</h2>
    }
    return (
      <div>
        <h2>Add new recipe</h2>
        <form>
          <p>Name</p>
          <input
            onChange={this.handleChange}
            className="c-search c-add__new"
            name="name"
            type="text"
          />
          <p>Content</p>
          <textarea
            onChange={this.handleChange}
            className="c-search c-add__new"
            name="content"
            rows="10"
          />
        </form>
        <div className="c-btn__container">
          <p onClick={this.handleSubmit} className="c-btn__item">Send</p>
        </div>
      </div>
    );
  }
}

export default withUser(AddNew);
