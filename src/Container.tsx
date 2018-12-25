import React, { Component } from "react";
import { IDish } from "./interfaces";

interface IStarters extends IDish {}

interface IMain extends IDish {}

interface IDessert extends IDish {}

interface IContainerState {
  starter: IStarters[];
  main: IMain[];
  dessert: IDessert[];
}

interface IContainerProps {}

export default class Container extends Component<
  IContainerProps,
  IContainerState
> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      starter: [{ name: "Prawn Cocktail", price: 10, id: 1 }],
      main: [{ name: "Meatball", price: 15, id: 2 }],
      dessert: [{ name: "Cheesecake", price: 8, id: 3 }]
    };
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <h3 className="title">Menu - Project App</h3>
        <div className="dishes-list">
          <select className="starter-list">
            <option value="">Select a starter</option>
            {this.state.starter.map((el, index) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <select className="main-list">
            <option value="">Select a main dish</option>
            {this.state.main.map((el, index) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <select className="dessert-list">
            <option value="">Select a dessert</option>
            {this.state.dessert.map((el, index) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="menu">Menu</div>
      </React.Fragment>
    );
  }
}
