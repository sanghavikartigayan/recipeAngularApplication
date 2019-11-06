import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeForm: FormGroup;
  editMode = false;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    // On routed to this page check whether the url has id or new. If it has id it should show the edit form else add form.
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null; // If the id is ther is url then set editmode to true else false.
      this.initForm(); // initiate the form with recipe data in if editmode true else new form.
    });
  }

  /**
   * On add new ingredient, create a new form group with form controls name and amount.
   * So that the user can enter the information on that input shown on template.
   */

  onAddNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  // Angular 8, excepts to iterate over form controls like this for formArray.
  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private initForm() {
    // Declare and assign empty string to the recipe informations.
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    /**
     * If edit mode is true, then get the recipe information reaching out to recipe service with that id
     * and assigning those values to the recipe information declaration variables.
     */

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      /**
       * If the ingredients array of recipe has informations of ingredients, then push them to the declared
       * form array as a new form group with form controls.
       */

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    // Initializing the rcipe form with those default values determined above.
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });

  }

  // On submit, check if the edit mode is true if so check to update recipe else to add Recipe with id and form values.
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel(); // After saving the recipes to the list navigate away.
  }

  // On cancel, navigate up one level.
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // On delete ingredient, remove item on form array with the index number.
  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
