import React, { Component } from "react";

import "./List.scss";

import withUser from "components/hocs/WithUser";

import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: ""
    };
  }

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection("drinks")
      .onSnapshot(snapshot => {
        const drinks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        this.setState({ items: drinks });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { items, value } = this.state;
    const {
      match: {
        params: { Id }
      },
      user
    } = this.props;

    if (Id && Id !== undefined && items !== undefined) {
      const item = items.find(({ id }) => {
        return id === Id;
      });
      return (
        <Item user={user} itemID={Id} value={item}>
          {0}
        </Item>
      );
    }

    return (
      <div>
        <div className="c-search__box">
          <input
            onChange={this.handleChange}
            placeholder="Search"
            value={value}
            className="c-search"
          />
        </div>
        <div className="c-item__list">
          {items
            .filter((item, i) => {
              const { name } = item;
              if (i <= 9 && value.length < 3) {
                return item;
              } else if (value.length >= 3) {
                return name.toLowerCase().includes(value.toLowerCase());
              }
              return;
            })
            .map((item, i) => {
              return (
                <Item info={true} key={i} value={item}>
                  {i}
                </Item>
              );
            })}
        </div>
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      content: "",
      err: null
    };
  }
  componentDidMount() {
    const { itemID } = this.props;
    if (itemID) {
      console.log(true);
      const data = firestore
        .collection("drinks")
        .doc(itemID)
        .collection("comments")
        .onSnapshot(snapshot => {
          const comments = snapshot.docs.map(doc => ({
            ...doc.data()
          }));

          this.setState({ comments });
        });
    }
  }

  handleSubmit = () => {
    const {
      user: { displayName },
      value: { id }
    } = this.props;
    const { content } = this.state;
    if (content) {
      firestore
        .collection("drinks")
        .doc(id)
        .collection("comments")
        .add({
          author: displayName,
          value: content
        })
        .then(resp => {
          this.setState({
            itemSaved: true,
            content: "",
            err:null
          });
        })
        .catch(err => this.setState({ err: err }));
    } else {
      this.setState({ err: "Please fill in all fields" });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.props.value === undefined) {
      return <p>Loading...</p>;
    }

    const { value, children, info, user } = this.props;
    const { name, content, author, id } = value;
    const { comments, err } = this.state;

    return (
      <div className="c-item">
        <h2 className="c-item__name">
          {children + 1}. {name}
        </h2>
        <p className="c-item__author">Author: {author}</p>
        <p className="c-item__content">{content}</p>

        {comments.length > 0 && <h2>Comments:</h2>}
        {comments.length > 0 &&
          comments.map((elem, i) => {
            const { author, value } = elem;
            return (
              <div className="c-comments" key={i}>
                <p className="c-author">{author}</p>
                <p>{value}</p>
              </div>
            );
          })}
        {err && <div className="c-info">{err}</div>}
        {user && (
          <textarea
            className="c-search c-add__new"
            value={this.state.content}
            onChange={this.handleChange}
            name="content"
            rows="10"
          />
        )}
        <div className="c-btn__container">
          {info && (
            <Link className="c-btn__item" to={`/list/${id}`}>
              More info...
            </Link>
          )}
          
          {!info && (
            <Link className="c-btn__item" to={`/list`}>
              Back
            </Link>
          )}
          {user && (
            <p onClick={this.handleSubmit} className="c-btn__item">
              Send
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default withUser(List);
