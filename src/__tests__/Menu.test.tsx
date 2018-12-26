import React from "react";
import { create } from "react-test-renderer";
import Menu from "../Menu";

describe("Menu component", () => {
  test("As a user I can see a menu with all my selectet dishes", () => {
    const selected = [
      {
        id: 1,
        name: "Prawn Cocktail",
        price: 10
      },
      {
        id: 3,
        name: "Steak",
        price: 40
      },
      {
        id: 5,
        name: "Apple Pie",
        price: 7
      }
    ];
    const component = create(<Menu selected={selected} />);
    const rootInstance = component.root;
    const selectedDishes = rootInstance.findByProps({
      className: "selected-dishes"
    });
    const totalPrice = rootInstance.findByProps({ className: "total-price" });
    expect(selectedDishes.props.children).toHaveLength(3);
    expect(totalPrice.props.children.join("")).toBe("€ 57");
  });
});
