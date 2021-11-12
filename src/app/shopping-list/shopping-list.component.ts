import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  template: `
    <div class="row">
      <div class="col-xs-10">
        <app-shopping-edit (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>
        <hr>
        <ul class="list-group">
          <a class="list-group-item" style="cursor: pointer;" *ngFor="let ingredient of ingredients">{{ ingredient.name }} {{ ingredient.amount }}</a>
        </ul>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
