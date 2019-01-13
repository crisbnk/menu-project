import React, { Component } from "react";
import axios from "axios";
import { IDish } from "./interfaces";
import Select from "./Select";
import Menu from "./Menu";
import DishCard from "./DishCard";
import { connect } from "react-redux";
import { showInfo, addToMenu, removeFromMenu, ActionTypes } from "./actions";

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
  [key: string]: IDish[];
}

interface IContainerProps {
  [key: string]: ActionTypes;
}

export class Container extends Component<IContainerProps, IContainerState> {
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
    const dish = this.state[id].filter((el: IDish) => value === el.name);
    const payload = { id: "dishInfo", dish };

    //@ts-ignore
    this.props.showInfo(payload);
  }

  handleClick(dish: IDish): void {
    // TODO - Dispatch an action
    //@ts-ignore
    this.props.addToMenu({
      id: "selected",
      dish
    });
  }

  handleRemove(dish: IDish): void {
    // @ts-ignore
    this.props.removeFromMenu({ id: "selected", dish });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="title">
          <h3>Menu - Project App</h3>
        </div>
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
        <div className="dish-card">
          <DishCard
            //@ts-ignore
            dish={this.props.dishInfo}
            handleClick={this.handleClick}
            //@ts-ignore
            forbiddenCombo={this.props.forbiddenCombo}
          />
        </div>
        <div className="menu">
          <Menu
            //@ts-ignore
            selected={this.props.selected}
            handleRemove={this.handleRemove}
          />
        </div>
      </React.Fragment>
    );
  }
}

//@ts-ignore
const mapStateToProps = state => {
  return {
    dishInfo: state.dishInfo,
    selected: state.selected,
    forbiddenCombo: state.forbiddenCombo
  };
};

export default connect(
  mapStateToProps,
  { showInfo, addToMenu, removeFromMenu }
)(Container);
