import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './homemodule/welcomecomponent/welcome.component';
import { RouterModule } from  '@angular/router';
import { ProductModule } from './product-module/product.module';
import { AppComponent } from './appcomponent/app.component'
import { HomeModule } from './homemodule/home.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

//import { MatDialog } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    /* All App component need this Modules */
    BrowserModule,
    FormsModule, // use ngIf and ngFor
    HttpClientModule,
    RouterModule.forRoot([
      { path : 'home', component : HomeModule },
      { path : '' , redirectTo: 'home' , pathMatch : 'full'},
      { path : '**', redirectTo : 'home' , pathMatch : 'full' }
    ]),
    ProductModule,
    HomeModule
   // MatDialog,
  ],
  bootstrap: [
      AppComponent  
  ]
})
export class AppModule {
  
}
