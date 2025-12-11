import { Component } from "react";

export default class CalcButton extends Component {
  render() {
    return <button>{this.props.number}</button>;
  }
}
