import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from "src/app/recipes/recipes.model";
import { DataStorageService } from "./data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Resolver loads data when recipe details are loaded
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      // If there are no recipes, fetch them
      return this.dataStorageService.fetchRecipes();
    } else {
      // Return same set of recipes
      return recipes;
    }
  }
}