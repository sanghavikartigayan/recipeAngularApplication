import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // Event emitter or subject that passes the index of the ingredient been edited - cross component interaction.
  startEditingFor = new Subject<number>();

  // Event emitter or subject that passes the ingredient information when ingredient list change - cross component interaction.
  ingredientChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Oranges', 2)
  ];
  constructor() { }

  // Returns only a copy of the ingredients array.
  getIngredients() {
    return this.ingredients.slice();
  }

  // Returns ingredient on that index.
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // Adds the new ingredient to the array and emit the copy of new list.
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // Adds ingredient from recipes component to the array and emit the copy of the new list.
  addIngredientsFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // Updates the ingredient information at that index and emits a copy of the new list.
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // Deletes the ingredient at that index and emit the copy of that new list.
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
