import React from "react";
import { create } from "react-test-renderer";
import { Container } from "../Container";
import { IPayload, IShowInfo, IAddToMenu, IRemoveFromMenu } from "../actions";
import { ActionTypeKeys } from "../constants/action-types";
import { IDish, IStarters, IMain, IDessert } from "../interfaces";

describe("Container component", () => {
  test("As a user I see a title section, a dishes list section and a menu section", () => {
    function showInfo(payload: IPayload): IShowInfo {
      return {
        type: ActionTypeKeys.SHOW_INFO,
        payload
      };
    }

    function addToMenu(payload: IPayload): IAddToMenu {
      return {
        type: ActionTypeKeys.ADD_TO_MENU,
        payload
      };
    }

    function removeFromMenu(payload: IPayload): IRemoveFromMenu {
      return { type: ActionTypeKeys.REMOVE_FROM_MENU, payload };
    }

    function getData() {}

    const starter: IStarters[] = [];
    const main: IMain[] = [];
    const dessert: IDessert[] = [];
    const message: string = "";
    const forbiddenCombo: string[] = [];
    const selected: IDish[] = [];
    const dishInfo: IDish = {
      id: 1,
      name: "Prawn cocktail",
      img: "https://unsplash.com/photos/3hQr2vMta74",
      price: 10
    };
    const totalPrice = 0;

    const component = create(
      <Container
        dishInfo={dishInfo}
        showInfo={showInfo}
        addToMenu={addToMenu}
        removeFromMenu={removeFromMenu}
        starter={starter}
        main={main}
        dessert={dessert}
        message={message}
        getData={getData}
        forbiddenCombo={forbiddenCombo}
        selected={selected}
        totalPrice={totalPrice}
      />
    );
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
