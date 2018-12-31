import React, { Component } from "react";
import axios from "axios";
import { IDish } from "./interfaces";
import Select from "./Select";
import Menu from "./Menu";
import DishCard from "./DishCard";

interface IforbiddenCombinations {
  [key: string]: string;
}

const forbiddenCombinations: IforbiddenCombinations = {
  Crostini: "Sushi",
  "Fruit salad": "Hamburger",
  Hamburger: "Fruit salad",
  Meatballs: "Mushroom salad",
  "Mushroom salad": "Meatballs",
  "Prawn cocktail": "Steak",
  Steak: "Prawn cocktail",
  Sushi: "Crostini"
};

interface IStarters extends IDish {}

interface IMain extends IDish {}

interface IDessert extends IDish {}

interface ISelected extends IDish {}

interface IDishInfo extends IDish {}

interface IContainerState {
  starter: IStarters[];
  main: IMain[];
  dessert: IDessert[];
  selected: ISelected[];
  dishInfo: IDishInfo[];
  forbiddenCombo: string[];
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
      dishInfo: [],
      forbiddenCombo: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    //@ts-ignore
    const dishInfo = this.state[id].filter((el: IDish) => value === el.name);

    this.setState(() => {
      return { dishInfo };
    });
  }

  handleClick(dish: IDish): void {
    const forbiddenDish = forbiddenCombinations[dish.name] || "";

    this.setState(() => {
      return {
        selected: this.state.selected.concat(dish),
        forbiddenCombo: forbiddenDish
          ? this.state.forbiddenCombo.concat(forbiddenDish)
          : this.state.forbiddenCombo
      };
    });
  }

  handleRemove(index: number, name: string): void {
    const newSelected = [...this.state.selected];
    const newForbiddenCombo = [...this.state.forbiddenCombo];

    newSelected.splice(index, 1);

    if (newForbiddenCombo.indexOf(forbiddenCombinations[name]) >= 0) {
      newForbiddenCombo.splice(
        newForbiddenCombo.indexOf(forbiddenCombinations[name]),
        1
      );
    }

    this.setState(() => {
      return { selected: newSelected, forbiddenCombo: newForbiddenCombo };
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
        <DishCard
          dish={this.state.dishInfo}
          handleClick={this.handleClick}
          forbiddenCombo={this.state.forbiddenCombo}
        />
        <Menu selected={this.state.selected} handleRemove={this.handleRemove} />
      </React.Fragment>
    );
  }
}
