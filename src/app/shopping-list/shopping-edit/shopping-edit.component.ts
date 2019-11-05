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
  @ViewChild('shoppingListForm', { static: false }) slForm: NgForm;
  subcription: Subscription;
  editingMode = false;
  editingItemIndex: number;
  editingItem: Ingredient;
  constructor(private slSErvice: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slSErvice.startEditingFor.subscribe((index: number) => {
      this.editingMode = true;
      this.editingItemIndex = index;
      this.editingItem = this.slSErvice.getIngredient(index);
      this.slForm.setValue({
        name: this.editingItem.name,
        amount: this.editingItem.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editingMode) {
      this.slSErvice.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.slSErvice.addIngredient(newIngredient);
    }
    this.editingMode = false;
    form.reset();

  }

  onDelete() {
    this.slSErvice.deleteIngredient(this.editingItemIndex);
    this.onCancel();
  }


  onCancel() {
    this.editingMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
