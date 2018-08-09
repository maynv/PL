import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from '../shared/star.component';
import { ConvertToSpacePipe } from '../shared/convert-to-spaces.pipe';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StarComponent,
    ConvertToSpacePipe,
  ],
  exports : [
    StarComponent,
    CommonModule,
    FormsModule,
    ConvertToSpacePipe
  ]
})
export class SharedModule { }
