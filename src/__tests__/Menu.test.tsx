import React from "react";
import { create } from "react-test-renderer";
import Menu from "../Menu";

describe("Menu component", () => {
  test("As a user I can see a menu with all my selectet dishes", () => {
    const selected = [
      {
        id: 1,
        name: "Prawn cocktail",
        img: "https://unsplash.com/photos/3hQr2vMta74",
        price: 10
      },
      {
        id: 4,
        name: "Sushi",
        img: "https://unsplash.com/photos/VIv0srmK78g",
        price: 18
      },
      {
        id: 5,
        name: "Apple pie",
        img: "https://unsplash.com/photos/xGYeAS0BjmQ",
        price: 7
      }
    ];
    const totalPrice = 35;

    const component = create(
      <Menu
        totalPrice={totalPrice}
        selected={selected}
        handleRemove={() => {}}
      />
    );
    const rootInstance = component.root;
    const selectedDishes = rootInstance.findByProps({
      className: "selected-dishes"
    });
    const total = rootInstance.findByProps({ className: "total-price" });
    expect(selectedDishes.props.children).toHaveLength(3);
    expect(total.props.children.join("")).toBe("€ 35");
  });

  test("As a user I can see a remove dish button for each of all my selectet dishes", () => {
    const selected = [
      {
        id: 1,
        name: "Prawn cocktail",
        img: "https://unsplash.com/photos/3hQr2vMta74",
        price: 10
      }
    ];
    const totalPrice = 10;

    const component = create(
      <Menu
        selected={selected}
        totalPrice={totalPrice}
        handleRemove={() => {}}
      />
    );
    const rootInstance = component.root;
    const removeDish = rootInstance.findByProps({ className: "remove-dish" });
    expect(removeDish.props.children).toBe("X");
  });
});
