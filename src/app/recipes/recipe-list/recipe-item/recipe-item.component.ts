import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  template: `
    <a href="#" class="list-group-item clearfix" (click)="onSelected()">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 50px;">
      </span>
    </a>
  `,
  styles: [`
  
  `]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
