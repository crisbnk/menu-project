import React from "react";
import { IDish } from "./interfaces";

interface IMenuProps {
  selected: IDish[];
  handleRemove(index: number, name: string): void;
}

const Menu: React.FunctionComponent<IMenuProps> = (props: IMenuProps) => {
  const totalPrice = props.selected.length
    ? props.selected.reduce((pv, cv) => {
        return { id: 0, name: "test", price: pv.price + cv.price, img: "" };
      })
    : { id: 0, name: "test", price: 0, img: "" };

  return (
    <div className="menu">
      <h3 className="menu-title">Your Menu</h3>
      <ul className="selected-dishes">
        {props.selected.map((el: IDish, index) => (
          <li key={el.id}>
            {el.name} - € {el.price}{" "}
            <span
              className="remove-dish"
              onClick={() => props.handleRemove(index, el.name)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
      <p className="total-price">€ {totalPrice.price}</p>
    </div>
  );
};

export default Menu;
