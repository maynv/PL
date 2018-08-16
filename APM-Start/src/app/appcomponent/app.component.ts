import { Component } from "@angular/core";
/* define component decorator */
@Component ({
  selector :'pm-root',
  templateUrl : "./app.component.html"
})
/* define app component */
export class AppComponent {
  pageTitle : string = ' Product Management ';
}