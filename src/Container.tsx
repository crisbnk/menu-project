import React, { Component } from "react";
import axios from "axios";
import { IDish } from "./interfaces";
import Select from "./Select";
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
  dishInfo: IDish[];
  [key: string]: IDish[];
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
      dishInfo: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleChange(event: React.SyntheticEvent): void {
    const { value, id } = event.target as HTMLInputElement;
    const dishInfo = this.state[id].filter(el => value === el.name);

    this.setState(() => {
      return { dishInfo };
    });
  }

  handleClick(dish: IDish): void {
    this.setState(() => {
      return { selected: this.state.selected.concat(dish) };
    });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <h3 className="title">Menu - Project App</h3>
        <div className="dishes-list">
          <Select
            name="starter"
            list={this.state.starter}
            title="Select a starter"
            handleChange={this.handleChange}
            id="starter"
          />
          <Select
            name="main"
            list={this.state.main}
            title="Select a main"
            handleChange={this.handleChange}
            id="main"
          />
          <Select
            name="dessert"
            list={this.state.dessert}
            title="Select a dessert"
            handleChange={this.handleChange}
            id="dessert"
          />
        </div>
        <DishCard dish={this.state.dishInfo} handleClick={this.handleClick} />
        <Menu selected={this.state.selected} />
      </React.Fragment>
    );
  }
}
