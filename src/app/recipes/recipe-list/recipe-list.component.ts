import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // Only store Recipe objects in array
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/chicken-&-other-poultry-dishes/adobo/main-header.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
