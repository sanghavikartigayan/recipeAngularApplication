import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://www.fatburgercanada.com/wp-content/uploads/2018/09/fb18_FatCheeseBeer.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ])
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromRecipe(ingredients);
  }
}
