import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'recipe-edit',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-xs-12">
              <button type="submit" class="btn btn-success" [disabled]="!recipeForm.valid">Save</button>
              <button type="button" class="btn btn-danger" (click)="onCancel()">Cancel</button>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="name">Name</label>
                <input 
                  type="text" 
                  id="name"
                  formControlName="name"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="imgPath">Image Path</label>
                <input 
                  type="text" 
                  id="imgPath"
                  formControlName="imagePath"
                  class="form-control"
                  #imagePath
                >
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <img [src]="imagePath.value" class="img-responsive">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="description">Description</label>
                <textarea 
                  type="text" 
                  id="description" 
                  class="form-control"
                  formControlName="description"
                  rows="6"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12" formArrayName="ingredients">
              <div 
                class="row"
                *ngFor="let ingredientCtrl of controls; let i = index"
                [formGroupName]="i"
                style="margin-top: 10px;"
              >
                <div class="col-xs-8">
                  <input 
                    type="text" 
                    class="form-control"
                    formControlName="name"
                  >
                </div>
                <div class="col-xs-2">
                  <input 
                    type="number" 
                    class="form-control"
                    formControlName="amount"
                  >
                </div>
                <div class="col-xs-2">
                  <button 
                    type="button" 
                    class="btn btn-danger"
                    (click)="onDeleteIngredient(i)"
                  >X</button>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-xs-12">
                  <button 
                    type="button" 
                    class="btn btn-success" 
                    (click)="onAddIngredient()"
                  >Add Ingredient</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
      border: 1px solid red;
    }
  `]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // Setting mode if we're editing an existing recipe, or making a new one
      this.editMode = params['id'] != null;
      // Initialize form when page is reloaded
      this.initForm();
    });
  }

  onSubmit() {
    // Long method of defining new recipe
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      // Shortcut of passing in form values (because it matches the Recipe schema)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // Getter for ingredients form group
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // Check if ingredients are present for the recipe
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      // Default value depends on our edit mode
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
