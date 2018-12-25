import React from "react";
import { create } from "react-test-renderer";
import Container from "../Container";

describe("Container component", () => {
  test("As a user I see a title section, a dishes list section and a menu section", () => {
    const component = create(<Container />);
    const rootInstance = component.root;
    const title = rootInstance.findByProps({ className: "title" });
    const dishes = rootInstance.findByProps({ className: "dishes-list" });
    const dishesList = dishes.findAllByType("select");
    const menu = rootInstance.findByProps({ className: "menu" });

    expect(title.props.children).toBe("Menu - Project App");
    expect(dishesList).toHaveLength(3);
    expect(menu.props.children).toBe("Menu");
  });
});
