import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    
  `]
})
export class AppComponent {
  loadedFeature: string = 'recipe';
  
}
