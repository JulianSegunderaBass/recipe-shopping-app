import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header (featureSelected)="onNavigate($event)"></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
          <app-shopping-list *ngIf="loadedFeature === 'shopping-list'"></app-shopping-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    
  `]
})
export class AppComponent {
  loadedFeature: string = 'recipe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
