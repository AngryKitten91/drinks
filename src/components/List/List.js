import React, { Component } from "react";

import "./List.scss";


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
            .filter((item,i)=>{
              const { name } = item;
              if(i <= 9 && value.length < 3){
                return item;
              } else if(value.length >= 3){
                return name.toLowerCase().includes(value.toLowerCase());
              }
            })
            .map((item, i) => {
              return <Item key={i} value={item} >{i}</Item>;
            })}
        </div>
      </div>
    );
  }
}

const Item = props => {
  const { value, children } = props;
  const { name, content, author } = value;
  return (
    <div className="c-item">
      <h3 className="c-item__name">{children + 1}. {name}</h3>
      <p className="c-item__author">{author}</p>
      <p className="c-item__content">{content}</p>
    </div>
  );
};

export default List;
