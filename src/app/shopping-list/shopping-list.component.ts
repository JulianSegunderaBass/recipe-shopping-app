import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  template: `
    <div class="row">
      <div class="col-xs-10">
        <app-shopping-edit></app-shopping-edit>
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
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

}
