import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from './shared/star.component';
import { ConvertToSpacePipe } from './shared/convert-to-spaces.pipe';

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
