import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipe-list',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-success" (click)="onNewRecipe()">New Recipe</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12">
        <app-recipe-item *ngFor="let recipeEl of recipes; let i = index" [recipe]="recipeEl" [index]="i"></app-recipe-item>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // Only store Recipe objects in array
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
