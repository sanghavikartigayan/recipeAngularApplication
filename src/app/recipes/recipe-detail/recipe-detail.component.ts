import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeChosen: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  // When reached to this component through id on url, store that id in local variable for later use in componnet.
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      // Reach out to recipe service with that id to get information about the recipe.
      this.recipeChosen = this.recipeService.getRecipeById(this.id);
    });
  }

  // On add ingredients to shopping list, reach out to the shopping list service and add/push this recipe ingredient to ingredients list.
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeChosen.ingredients);
  }

  // On Edit recipe, navigate to recipe edit component.
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  // On delete recipe, reach out to recipe service and splice that recipe with index.
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']); // After removing that item navigate to home page that displays the recipe list.
  }

}
