import { NgModule } from '@angular/core';
import { RouterModule } from '../../../node_modules/@angular/router';
import { WelcomeComponent } from './welcomecomponent/welcome.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path : 'home' , component : WelcomeComponent},
    ]),
  ],
  declarations: []
})
export class HomeModule { }
