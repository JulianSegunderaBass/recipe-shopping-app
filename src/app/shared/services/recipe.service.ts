import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "src/app/recipes/recipes.model";
import { Ingredient } from "../ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Adobong Manok', 
      'Recipe for Adobong Manok', 
      'https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/chicken-&-other-poultry-dishes/adobo/main-header.jpg',
      [
        new Ingredient('Chicken', 6),
        new Ingredient('Toyo', 6),
        new Ingredient('Vinegar', 6),
        new Ingredient('Water', 12)
      ]
    ),
    new Recipe(
      'Pancit Canton', 
      'Recipe for Pancit Canton', 
      'https://www.foxyfolksy.com/wp-content/uploads/2019/02/pancit-canton-640.jpg',
      [
        new Ingredient('Noodles', 6),
        new Ingredient('Vegetables', 6),
        new Ingredient('Liver', 6)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    // Returning a new array that's a copy of the original
    return this.recipes.slice();
  }

  // Getting a recipe by id
  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}