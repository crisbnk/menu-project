import React from "react";
import { IDish } from "./interfaces";

interface IDishCardProps {
  dish: IDish[];
  handleClick(dish: IDish): void;
  forbiddenCombo: string[];
}

const DishCard: React.FunctionComponent<IDishCardProps> = (
  props: IDishCardProps
) => {
  return (
    <div className="dish-card">
      <h3 className="dish-card-title">Dish Info</h3>
      {props.dish.length ? (
        <div>
          <img className="dish-image" src={props.dish[0].img} alt="" />
          <p>
            <span className="dish-name">{props.dish[0].name}</span>
            <br />
            <span className="dish-price">€ {props.dish[0].price}</span>
          </p>
          {props.forbiddenCombo.indexOf(props.dish[0].name) >= 0 ? (
            <p className="dish-forbidden">Cannot add this dish to menu!</p>
          ) : (
            <button onClick={() => props.handleClick(props.dish[0])}>
              Add to menu
            </button>
          )}
        </div>
      ) : (
        <p>Please select a dish</p>
      )}
    </div>
  );
};

export default DishCard;
