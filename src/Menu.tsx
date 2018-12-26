import React from "react";
import { IDish } from "./interfaces";

interface IMenuProps {
  selected: IDish[];
}

const Menu: React.FunctionComponent<IMenuProps> = (props: IMenuProps) => {
  console.log(props.selected);
  const totalPrice = props.selected.reduce((pv, cv) => {
    return { id: 0, name: "test", price: pv.price + cv.price };
  });
  return (
    <div>
      <ul className="selected-dishes">
        {props.selected.map((el: IDish) => (
          <li key={el.id}>
            {el.name} - € {el.price}
          </li>
        ))}
      </ul>
      <p className="total-price">€ {totalPrice.price}</p>
    </div>
  );
};

export default Menu;
