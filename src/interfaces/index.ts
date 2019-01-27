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
  forbiddenCombo: string[];
}
