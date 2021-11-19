import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'recipe-edit',
  template: `
    <p>Recipe Edit</p>
  `,
  styles: [`
  
  `]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // Setting mode if we're editing an existing recipe, or making a new one
      this.editMode = params['id'] != null;
    })
  }

}
