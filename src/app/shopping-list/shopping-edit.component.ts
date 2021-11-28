import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
          <div class="row">
            <div class="col-sm-5 form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                class="form-control" 
                name="name" 
                ngModel
                required
              >
            </div>
            <div class="col-sm-2 form-group">
              <label for="amount">Amount</label>
              <input 
                type="number" 
                id="amount" 
                class="form-control" 
                name="amount" 
                ngModel
                required
                [pattern]="'^[1-9]+[0-9]*$'"
              >
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button class="btn btn-success" type="submit" [disabled]="!f.valid">{{ editMode ? 'Update' : 'Add' }}</button>
              <button class="btn btn-danger" type="button" (click)="onDelete()" *ngIf="editMode">Delete</button>
              <button class="btn btn-primary" type="button" (click)="onClear()">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  // Mode of editing
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // Check mode before adding or updating ingredients
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    // Important to leave edit mode after
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
