import React from "react";
import { IDish } from "./interfaces";

interface IDishListProps {
  name: String;
  title: String;
  dishes: IDish[];
}

const DishList: React.FunctionComponent<IDishListProps> = (
  props: IDishListProps
) => {
  return (
    <select className={`${props.name}-list`} name="" id="">
      <option value="">{props.title}</option>
      {props.dishes.map((el: IDish) => (
        <option key={el.id} value={el.name}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

export default DishList;
