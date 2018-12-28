import React, { Component } from "react";
import axios from "axios";
import { IDish } from "./interfaces";
import DishList from "./DishList";
import Menu from "./Menu";
import DishCard from "./DishCard";

interface IStarters extends IDish {}

interface IMain extends IDish {}

interface IDessert extends IDish {}

interface ISelected extends IDish {}

interface IContainerState {
  starter: IStarters[];
  main: IMain[];
  dessert: IDessert[];
  selected: ISelected[];
  dishInfo: IDish;
}

interface IContainerProps {}

export default class Container extends Component<
  IContainerProps,
  IContainerState
> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      starter: [],
      main: [],
      dessert: [],
      selected: [],
      dishInfo: { id: 0, name: "Select a Dish", price: 0 }
    };
  }

  // Move async logic out of React Component?
  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    try {
      const response = await axios.get("http://localhost:3004/dishes");
      return this.loadDishes(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  loadDishes(dishesList: IContainerState) {
    this.setState(() => {
      return {
        starter: dishesList.starter,
        main: dishesList.main,
        dessert: dishesList.dessert
      };
    });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <h3 className="title">Menu - Project App</h3>
        <div className="dishes-list">
          <DishList
            name="starter"
            dishes={this.state.starter}
            title="Select a starter"
          />
          <DishList
            name="main"
            dishes={this.state.main}
            title="Select a main"
          />
          <DishList
            name="dessert"
            dishes={this.state.dessert}
            title="Select a dessert"
          />
        </div>
        <DishCard dish={this.state.dishInfo} />
        <Menu selected={this.state.selected} />
      </React.Fragment>
    );
  }
}
