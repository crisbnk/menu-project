export interface IDish {
  name: string;
  price: number;
  id: number;
  img: string;
}

export interface IInitialState {
  starter: IDish[];
  main: IDish[];
  dessert: IDish[];
  selected: IDish[];
  dishInfo: IDish;
  message: string;
  forbiddenCombo: string[];
  totalPrice: number;
}

export interface IStarters extends IDish {}

export interface IMain extends IDish {}

export interface IDessert extends IDish {}

export interface ISelected extends IDish {}

export interface IDishInfo extends IDish {}
