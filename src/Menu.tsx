import React from "react";
import { IDish } from "./interfaces";

interface IMenuProps {
  selected: IDish[];
  totalPrice: number;
  handleRemove(dish: IDish): void;
}

const Menu: React.FunctionComponent<IMenuProps> = (props: IMenuProps) => {
  return (
    <React.Fragment>
      <h3 className="menu-title">Your Menu</h3>
      <ul className="selected-dishes">
        {props.selected.map((el: IDish) => (
          <li key={el.id}>
            {el.name} - € {el.price}{" "}
            <span
              className="remove-dish"
              onClick={() => props.handleRemove(el)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
      <p className="total-price">€ {props.totalPrice}</p>
    </React.Fragment>
  );
};

export default Menu;
