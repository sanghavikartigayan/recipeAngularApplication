import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  // Declaring Recipe variables
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  // Initializing/ Instantiating them at the constructor.
  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
