import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,     
    CommonModule
  ],
  exports: [
    PaginationComponent,
    CommonModule
  ]
})
export class SharedModule {}
