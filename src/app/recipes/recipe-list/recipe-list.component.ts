import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // Array declartion to store the recipe list.
  recipes: Recipe[];
  recipeChanging: Subscription; // A subscription to store recipe list changes.

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Listening to recipe list changes - new recipe added, a recipe is deleted or updated on the list.
    this.recipeChanging = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    // Storing the recipes on an array.
    this.recipes = this.recipeService.getRecipes();
  }

  // When add new recipe is chosen the second olumn on UI should display the add recipe form, so navigate to that child component -route.
  onNewRecipeClicked() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // The subscription that colleted the recipe list changes needs to be cleared/unsubscribed to avoid memory leakage.
  ngOnDestroy() {
    this.recipeChanging.unsubscribe();
  }

}
