import { Component } from "@angular/core";

/* define component decorator */
@Component ({
  selector :'pm-root',
  templateUrl : "../template/app.template.html"
})
/* define app component */
export class AppComponent {
  pageTitle : string = ' Product Management ';
}