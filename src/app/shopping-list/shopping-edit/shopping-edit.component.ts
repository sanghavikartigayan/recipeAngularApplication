import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Accessing Shopping list form through viewChild.
  @ViewChild('shoppingListForm', { static: false }) slForm: NgForm;
  subcription: Subscription; // Subscription to store the ingredients changes.
  editingMode = false;
  editingItemIndex: number;
  editingItem: Ingredient;
  constructor(private slSErvice: ShoppingListService) { }

  ngOnInit() {
    // Accessing what ingredient is been edited by listening to ingredient index.
    this.subcription = this.slSErvice.startEditingFor.subscribe((index: number) => {
      // Once that ingredient index returned to us, setting the editing mode to true, storing that index to local variable.
      this.editingMode = true;
      this.editingItemIndex = index;
      // Reaching out to Shopping list service to ge ingredient information that was previously stored.
      this.editingItem = this.slSErvice.getIngredient(index);
      // Prefetching those data on the form to enable user to edit.
      this.slForm.setValue({
        name: this.editingItem.name,
        amount: this.editingItem.amount
      });
    });
  }

  // On add or submission of the form, get those form data and store them in newIngredient object.
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // Check if the editing mode is true, if so update the ingredient else add that object as new ingredient.
    if (this.editingMode) {
      this.slSErvice.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.slSErvice.addIngredient(newIngredient);
    }

    // After added them to ingredient list or array, set the editing mode back to false and reset form data.
    this.editingMode = false;
    form.reset();

  }

  // On delete ingredient, reach out to service to splice that ingredient.
  onDelete() {
    this.slSErvice.deleteIngredient(this.editingItemIndex);
    this.onCancel(); // An then set the editing mode to false, then reset the form.
  }

  onCancel() {
    this.editingMode = false;
    this.slForm.reset();
  }

  // On destroy, unsubscribe to the subscription inorder to avoid memory leakage.
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
