import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() pager:any;
  
  @Output() setPage = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSetPage(page: number){
    this.setPage.emit(page)
  }
}
