import React from "react";
import { create } from "react-test-renderer";
import DishList from "../DishList";

describe("DishList component", () => {
  test("As a user I can see a list of starter dishes", () => {
    const name = "starter";
    const title = "Select a starter";
    const dishes = [
      {
        id: 1,
        name: "Prawn Cocktail",
        price: 10
      },
      {
        id: 2,
        name: "Crostini",
        price: 5
      }
    ];
    const component = create(
      <DishList dishes={dishes} name={name} title={title} />
    );
    const rootInstance = component.root;
    const select = rootInstance.findByType("select");
    const options = select.findAllByType("option");

    expect(options).toHaveLength(3);
    expect(options[0].props.children).toBe("Select a starter");
  });
});
