import React from "react";
import { IDish } from "./interfaces";

interface IDishCardProps {
  dish: IDish;
}

const DishCard: React.FunctionComponent<IDishCardProps> = (
  props: IDishCardProps
) => {
  return (
    <div className="dish-card">
      <p>
        <span className="dish-name">{props.dish.name}</span>
        <span className="dish-price">{props.dish.price}</span>
      </p>
    </div>
  );
};

export default DishCard;
