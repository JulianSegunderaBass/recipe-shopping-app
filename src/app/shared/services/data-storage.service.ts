import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/recipes/recipes.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' }) // Alternative provide syntax: ;
export class DataStorageService {
  // Injecting client and recipe service
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // Put request used for Firebase to update data
    this.http.put('https://recipe-shopping-app-a1dde-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    // <> added to say what type the response data is
    return this.http
    .get<Recipe[]>('https://recipe-shopping-app-a1dde-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
    .pipe(
      map(recipes => {
        // For recipes without ingredients (map below is the standard JS map, not rxjs)
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })}
      ),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    )
  }
}