import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <form>
          <div class="row">
            <div class="col-sm-5 form-group">
              <label for="name">Name</label>
              <input type="text" id="name" class="form-control" #nameInput>
            </div>
            <div class="col-sm-2 form-group">
              <label for="amount">Amount</label>
              <input type="number" id="amount" class="form-control" #amountInput>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button class="btn btn-success" type="submit" (click)="onAddItem()">Add</button>
              <button class="btn btn-danger" type="button">Delete</button>
              <button class="btn btn-primary" type="button">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
  }

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

}
