import React from "react";
import { IDish } from "./interfaces";

interface IDishCardProps {
  dish: IDish;
  handleClick(dish: IDish): void;
  forbiddenCombo: string[];
}

const DishCard: React.FunctionComponent<IDishCardProps> = (
  props: IDishCardProps
) => {
  return (
    <React.Fragment>
      <h3 className="dish-card-title">Dish Info</h3>
      {props.dish.name ? (
        <div>
          <img className="dish-image" src={props.dish.img} alt="" />
          <p>
            <span className="dish-name">{props.dish.name}</span>
            <br />
            <span className="dish-price">€ {props.dish.price}</span>
          </p>
          {props.forbiddenCombo.indexOf(props.dish.name) >= 0 ? (
            <p className="dish-forbidden">Cannot add this dish to menu!</p>
          ) : (
            <button onClick={() => props.handleClick(props.dish)}>
              Add to menu
            </button>
          )}
        </div>
      ) : (
        <p>Please select a dish</p>
      )}
    </React.Fragment>
  );
};

export default DishCard;
