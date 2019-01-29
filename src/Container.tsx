import React, { Component } from "react";
import { IDish } from "./interfaces";
import Select from "./Select";
import Menu from "./Menu";
import DishCard from "./DishCard";
import { connect } from "react-redux";
import { IInitialState } from "./interfaces";
import {
  showInfo,
  addToMenu,
  removeFromMenu,
  IShowInfo,
  IPayload,
  IAddToMenu,
  IRemoveFromMenu,
  getData
} from "./actions";

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
  showInfo(payload: IPayload): IShowInfo;
  addToMenu(payload: IPayload): IAddToMenu;
  removeFromMenu(payload: IPayload): IRemoveFromMenu;
  getData(): void;
  starter: IStarters[];
  main: IMain[];
  dessert: IDessert[];
  dishInfo: IDish;
  forbiddenCombo: string[];
  selected: IDish[];
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
  componentDidMount() {
    this.props.getData();
  }

  handleChange(event: React.SyntheticEvent): void {
    const { value, id } = event.target as HTMLInputElement;
    // @ts-ignore
    const dish = this.props[id].filter((el: IDish) => value === el.name)[0];
    const payload = { id: "dishInfo", dish };

    this.props.showInfo(payload);
  }

  handleClick(dish: IDish): void {
    this.props.addToMenu({
      id: "selected",
      dish
    });
  }

  handleRemove(dish: IDish): void {
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
            list={this.props.starter}
            title="Select a starter"
            handleChange={this.handleChange}
            id="starter"
          />
          <Select
            name="main"
            list={this.props.main}
            title="Select a main"
            handleChange={this.handleChange}
            id="main"
          />
          <Select
            name="dessert"
            list={this.props.dessert}
            title="Select a dessert"
            handleChange={this.handleChange}
            id="dessert"
          />
        </div>
        <div className="dish-card">
          <DishCard
            dish={this.props.dishInfo}
            handleClick={this.handleClick}
            forbiddenCombo={this.props.forbiddenCombo}
          />
        </div>
        <div className="menu">
          <Menu
            selected={this.props.selected}
            handleRemove={this.handleRemove}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IInitialState) => {
  return {
    starter: state.starter,
    main: state.main,
    dessert: state.dessert,
    dishInfo: state.dishInfo,
    selected: state.selected,
    forbiddenCombo: state.forbiddenCombo
  };
};

export default connect(
  mapStateToProps,
  { showInfo, addToMenu, removeFromMenu, getData }
)(Container);
