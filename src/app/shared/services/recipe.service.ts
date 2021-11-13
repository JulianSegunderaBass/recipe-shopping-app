import { EventEmitter } from "@angular/core";
import { Recipe } from "src/app/recipes/recipes.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Adobong Manok', 'Recipe for Adobong Manok', 'https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/chicken-&-other-poultry-dishes/adobo/main-header.jpg'),
    new Recipe('Pancit Canton', 'Recipe for Pancit Canton', 'https://www.foxyfolksy.com/wp-content/uploads/2019/02/pancit-canton-640.jpg'),
  ];

  getRecipes() {
    // Returning a new array that's a copy of the original
    return this.recipes.slice();
  }
}