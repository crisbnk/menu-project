import React from "react";
import { create } from "react-test-renderer";
import Select from "../Select";

describe("Select component", () => {
  test("As a user I can see a list of starter dishes", () => {
    const name = "starter";
    const title = "Select a starter";
    const dishes = [
      {
        id: 1,
        name: "Prawn cocktail",
        img: "https://unsplash.com/photos/3hQr2vMta74",
        price: 10
      },
      {
        id: 2,
        name: "Crostini",
        img: "https://unsplash.com/photos/YUQEo7ajeLA",
        price: 5
      }
    ];
    const component = create(
      <Select
        list={dishes}
        name={name}
        title={title}
        handleChange={() => {}}
        id="starter"
      />
    );
    const rootInstance = component.root;
    const select = rootInstance.findByType("select");
    const options = select.findAllByType("option");

    expect(options).toHaveLength(3);
    expect(options[0].props.children).toBe("Select a starter");
  });
});
