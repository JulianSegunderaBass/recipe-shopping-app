import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
        <app-recipe-item *ngFor="let recipeEl of recipes" [recipe]="recipeEl" (recipeSelected)="onRecipeSelected(recipeEl)"></app-recipe-item>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class RecipeListComponent implements OnInit {
  // Only store Recipe objects in array
  recipes: Recipe[] = [
    new Recipe('Adobong Manok', 'Recipe for Adobong Manok', 'https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/chicken-&-other-poultry-dishes/adobo/main-header.jpg'),
    new Recipe('Pancit Canton', 'Recipe for Pancit Canton', 'https://www.foxyfolksy.com/wp-content/uploads/2019/02/pancit-canton-640.jpg'),
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
