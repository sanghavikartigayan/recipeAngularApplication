import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test', 'Test', '../../assets/Creamy-Beef-and-ShellsIMG_6411.jpg')
  ];
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

}
