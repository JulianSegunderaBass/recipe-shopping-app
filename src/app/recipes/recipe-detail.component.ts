import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipe-detail',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 300px;">
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h1>{{ recipe.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="btn-group" appDropdown>
          <button type="button" class="btn btn-primary dropdown-toggle">Manage Recipe <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a (click)="onAddToShoppingList()" style="cursor: pointer;">To Shopping List</a></li>
            <li><a href="#">Edit Recipe</a></li>
            <li><a href="#">Delete Recipe</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-1">
        {{ recipe.description }}
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let ingredient of recipe.ingredients">{{ ingredient.name }} - {{ ingredient.amount }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
