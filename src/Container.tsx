import React, { useEffect } from "react";
import { IDish, IStarters, IMain, IDessert } from "./interfaces";
import Select from "./Select";
import Menu from "./Menu";
import DishCard from "./DishCard";
import Message from "./Message";
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
import { selectedSelector } from "./selectors";

interface IContainerProps {
  showInfo(payload: IPayload): IShowInfo;
  addToMenu(payload: IPayload): IAddToMenu;
  removeFromMenu(payload: IPayload): IRemoveFromMenu;
  getData(): void;
  starter: IStarters[];
  main: IMain[];
  dessert: IDessert[];
  dishInfo: IDish;
  message: string;
  forbiddenCombo: string[];
  selected: IDish[];
  totalPrice: number;
}

export const Container: React.FunctionComponent<IContainerProps> = (
  props: IContainerProps
) => {
  useEffect(() => {
    props.getData();
  });

  function handleChange(event: React.SyntheticEvent): void {
    const { value, id } = event.target as HTMLInputElement;
    // @ts-ignore
    const dish = props[id].filter((el: IDish) => value === el.name)[0];
    const payload = { id: "dishInfo", dish };

    props.showInfo(payload);
  }

  function handleClick(dish: IDish): void {
    props.addToMenu({
      id: "selected",
      dish
    });
  }

  function handleRemove(dish: IDish): void {
    props.removeFromMenu({ id: "selected", dish });
  }

  return (
    <React.Fragment>
      <div className="title">
        <h3>Menu - Project App</h3>
      </div>
      <div className="dishes-list">
        <Select
          name="starter"
          list={props.starter}
          title="Select a starter"
          handleChange={handleChange}
          id="starter"
        />
        <Select
          name="main"
          list={props.main}
          title="Select a main"
          handleChange={handleChange}
          id="main"
        />
        <Select
          name="dessert"
          list={props.dessert}
          title="Select a dessert"
          handleChange={handleChange}
          id="dessert"
        />
      </div>
      {props.message ? (
        <div className="message">
          <Message message={props.message} />
        </div>
      ) : (
        <div />
      )}
      <div className="dish-card">
        <DishCard
          dish={props.dishInfo}
          handleClick={handleClick}
          forbiddenCombo={props.forbiddenCombo}
        />
      </div>
      <div className="menu">
        <Menu
          selected={props.selected}
          totalPrice={props.totalPrice}
          handleRemove={handleRemove}
        />
      </div>
    </React.Fragment>
  );
};

const select = (state: IInitialState) => {
  return {
    starter: state.starter,
    main: state.main,
    dessert: state.dessert,
    dishInfo: state.dishInfo,
    message: state.message,
    selected: state.selected,
    forbiddenCombo: state.forbiddenCombo,
    totalPrice: selectedSelector(state)
  };
};

export default connect(
  select,
  { showInfo, addToMenu, removeFromMenu, getData }
)(Container);
