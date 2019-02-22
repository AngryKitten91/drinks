import React, { Component } from "react";

import "./List.scss";

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
      }
    } = this.props;

    if (Id && Id !== undefined && items !== undefined) {
      const item = items.find(({ id }) => {
        return id === Id;
      });
      return <Item value={item}>{0}</Item>;
      
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

const Item = props => {
  
  if(props.value === undefined ){
    return <p>Loading...</p>
  }
  const { value, children, info } = props;
  const { name, content, author, id } = value;
  return (
    <div className="c-item">
      <h3 className="c-item__name">
        {children + 1}. {name}
      </h3>
      <p className="c-item__author">Author: {author}</p>
      <p className="c-item__content">{content}</p>
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
      
      </div>

    </div>
  );
};

export default List;
