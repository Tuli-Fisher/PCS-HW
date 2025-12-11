import { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    total: null,
  };
  udpateState = (e) => {
    this.setState((prev) => ({
      current:
        prev.current == null ? e.target.value : prev.current + e.target.value,
    }));
    this.setState();
  };

  setOperator = (o) => {
    //console.dir(o.target);
    this.setState({
      total: this.state.current,
      operator: o.target.textContent,
    });
  };

  calcTotal = () => {
    let a = parseInt(this.state.total);
    let b = parseInt(this.state.current);

    const ops = {
      "+": a + b,
      "-": a - b,
      "*": a * b,
      "/": a / b,
    };

    let result = ops[this.state.operator];
    this.setState({ total: null, current: result, operator: null });
  };

  clear = () => this.setState({ total: null, current: null, operator: null });

  render() {
    const buttons = [];

    for (let i = 0; i <= 9; i++) {
      buttons.push(
        <button onClick={this.udpateState} value={i} key={i}>
          {i}
        </button>
      );
    }

    return (
      <div className="calc">
        <div className="display-box">{this.state?.total ?? ""}</div>
        <div className="button-box">
          {buttons}
          <button onClick={this.calcTotal}>=</button>
          <button onClick={this.clear}>Clear</button>
        </div>
        <div className="operator-box">
          <button onClick={this.setOperator}>+</button>
          <button onClick={this.setOperator}>-</button>
          <button onClick={this.setOperator}>*</button>
          <button onClick={this.setOperator}> / </button>
        </div>
      </div>
    );
  }
}
