import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  igChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * On Init, reach out to the shopping list service to get the ingredients and store them in local array variable.
   */
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // Listen to any changes on the ingredient list array, by subscribing to the service subject.
    this.igChanged = this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients; // Updating the ingredients array to have the new data.
    });
  }

  // On destroy, unsubscribe to the subscription inorder to avoid the memory leakage.
  ngOnDestroy() {
    this.igChanged.unsubscribe();
  }

  /**
   * On clicking the shopping list item,
   * trigger this method that emit this ingredient id to the subject on the service, to make it available for editing.
   */
  onEditShoppingListItem(index: number) {
    this.shoppingListService.startEditingFor.next(index);
  }
}
