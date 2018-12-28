import React from "react";
import { create } from "react-test-renderer";
import DishCard from "../DishCard";

describe("DishCard component", () => {
  test("As a user I see a card section with info about a selected dish", () => {
    const dish = {
      id: 1,
      name: "Prawn Cocktail",
      price: 10
    };
    const component = create(<DishCard dish={dish} />);
    const rootInstance = component.root;
    const name = rootInstance.findByProps({ className: "dish-name" });
    const price = rootInstance.findByProps({ className: "dish-price" });

    expect(name.props.children).toBe("Prawn Cocktail");
    expect(price.props.children).toBe(10);
  });
});
