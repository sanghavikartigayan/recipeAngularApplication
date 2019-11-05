import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  constructor(private slSErvice: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(value) {
    const newIngredient = new Ingredient(value.ingredientName, value.ingredientAmount);
    this.slSErvice.addIngredient(newIngredient);
  }

}
