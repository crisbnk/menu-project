import React, { Component } from "react";
import { IDish } from "./interfaces";

//

interface IStarters extends IDish {
  description: string;
}

interface IMain extends IDish {}

interface IDessert extends IDish {}
//

interface IContainerState {
  starters: IStarters[];
  main: IMain[];
  dessert: IDessert[];
}

interface IContainerProps {}
//

export default class Container extends Component<
  IContainerProps,
  IContainerState
> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      starters: [{ name: "Prawn Cocktail", price: 10, description: "", id: 1 }],
      main: [{ name: "Meatball", price: 15, id: 2 }],
      dessert: [{ name: "Cheesecake", price: 8, id: 3 }]
    };
  }

  render(): React.ReactNode {
    return null;
  }
}
