interface IforbiddenCombinations {
  [key: string]: string;
}

const forbiddenCombinations: IforbiddenCombinations = {
  Crostini: "Sushi",
  "Fruit salad": "Hamburger",
  Hamburger: "Fruit salad",
  Meatballs: "Mushroom salad",
  "Mushroom salad": "Meatballs",
  "Prawn cocktail": "Steak",
  Steak: "Prawn cocktail",
  Sushi: "Crostini"
};

export default forbiddenCombinations;
