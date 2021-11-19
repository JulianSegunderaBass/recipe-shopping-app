import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  template: `
    <div class="row">
      <div class="col-md-5">
          <app-recipe-list></app-recipe-list>
      </div>
      <div class="col-md-7">
          <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    
  `],
  // Providing service to component + child components
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

}
