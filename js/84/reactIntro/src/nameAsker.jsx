//import { useState } from "react";
import { Component } from "react";

export default class NameAsker extends Component {
    
  constructor(props) {
    super(props);
    this.state = { name: "" }; // initialize state
  }

  handleClick = () => {
    const name = prompt("Please enter your name:");
    if (name) {
      this.setState({ name }); // update state properly
    }
  };

  render() {
    const { name } = this.state;
    return (
      <>
        {name ? (
          <h3>Hello, {name}!</h3>
        ) : (
          <button onClick={this.handleClick}>Enter your name</button>
        )}
      </>
    );
  }
}
