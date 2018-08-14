import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from  '@angular/router';
import { ProductModule } from './product-module/product.module';




//import { MatDialog } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    /* All App component need this Modules */
    BrowserModule,
    FormsModule, // use ngIf and ngFor
    HttpClientModule,
    RouterModule.forRoot([
      { path : 'welcome', component : WelcomeComponent },
      { path : '' , redirectTo: 'welcome' , pathMatch : 'full'},
      { path : '**', redirectTo : 'welcome' , pathMatch : 'full' }
    ]),
    ProductModule,
   // MatDialog,
  ],
  bootstrap: [
      AppComponent  
  ]
})
export class AppModule { }
