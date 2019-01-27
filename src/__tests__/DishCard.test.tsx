import React from "react";
import { create } from "react-test-renderer";
import DishCard from "../DishCard";

describe("DishCard component", () => {
  test("As a user I see a card section with info about a selected dish", () => {
    const dish = {
      id: 1,
      name: "Prawn cocktail",
      img: "https://unsplash.com/photos/3hQr2vMta74",
      price: 10
    };
    const component = create(
      <DishCard dish={dish} handleClick={() => {}} forbiddenCombo={[]} />
    );
    const rootInstance = component.root;
    const image = rootInstance.findByProps({ className: "dish-image" });
    const name = rootInstance.findByProps({ className: "dish-name" });
    const price = rootInstance.findByProps({ className: "dish-price" });
    const button = rootInstance.findByType("button");

    expect(name.props.children).toBe("Prawn cocktail");
    expect(price.props.children.join("")).toBe("€ 10");
    expect(button.props.children).toBe("Add to menu");
  });

  test("As a user I see a message if a dish is forbidden with the already selected dishes", () => {
    const forbiddenCombo = ["Steak"];
    const dish = {
      id: 3,
      name: "Steak",
      img: "https://unsplash.com/photos/jeiqzOgwwKU",
      price: 40
    };
    const component = create(
      <DishCard
        dish={dish}
        handleClick={() => {}}
        forbiddenCombo={forbiddenCombo}
      />
    );
    const rootInstance = component.root;
    const forbidden = rootInstance.findByProps({
      className: "dish-forbidden"
    });
    expect(forbidden.props.children).toBe("Cannot add this dish to menu!");
  });
});
