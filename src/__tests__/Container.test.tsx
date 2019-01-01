import React from "react";
import { create } from "react-test-renderer";
import Container from "../Container";

describe("Container component", () => {
  test("As a user I see a title section, a dishes list section and a menu section", () => {
    const component = create(<Container />);
    const rootInstance = component.root;
    const title = rootInstance.findByProps({ className: "title" });
    const titleHeader = title.findByType("h3");
    const dishes = rootInstance.findByProps({ className: "dishes-list" });
    const select = dishes.findAllByType("select");
    const dishCard = rootInstance.findByProps({ className: "dish-card" });
    const dishCardTitle = dishCard.findByProps({
      className: "dish-card-title"
    });
    const menu = rootInstance.findByProps({ className: "menu" });
    const menuTitle = menu.findByProps({ className: "menu-title" });

    expect(titleHeader.props.children).toBe("Menu - Project App");
    expect(select).toHaveLength(3);
    expect(dishCardTitle.props.children).toBe("Dish Info");
    expect(menuTitle.props.children).toBe("Your Menu");
  });
});
