import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipe-list',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-success">New Recipe</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12">
        <app-recipe-item *ngFor="let recipeEl of recipes" [recipe]="recipeEl"></app-recipe-item>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class RecipeListComponent implements OnInit {
  // Only store Recipe objects in array
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    
  }

}
