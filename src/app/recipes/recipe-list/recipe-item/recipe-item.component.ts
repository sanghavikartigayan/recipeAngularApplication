import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // Receiving the recipe information and the id from the parent component - Recipes
  @Input() recipe: Recipe;
  @Input() recipeId: number;
  constructor() { }

  ngOnInit() {
  }

}
