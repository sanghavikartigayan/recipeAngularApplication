import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientName', { static: false }) ingredientNameInput: ElementRef;
  @ViewChild('ingredientAmount', { static: false }) ingredientAmountInput: ElementRef;


  constructor(private slSErvice: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredientName = this.ingredientNameInput.nativeElement.value;
    const ingredientAmount = this.ingredientAmountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.slSErvice.addIngredient(newIngredient);
  }

}
