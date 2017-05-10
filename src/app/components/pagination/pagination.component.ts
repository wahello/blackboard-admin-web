import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Pageable } from '../pageable';
import { Page } from '../page';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  pageable: Pageable;
  @Input()
  page: Page<any>;
  @Input()
  rowsPerPages: number[];
  @Output()
  change = new EventEmitter<Pageable>();

  constructor() { }

  ngOnInit() {
    this.pageable = this.pageable || new Pageable();
    this.page = this.page || new Page();
    this.rowsPerPages = this.rowsPerPages || [10, 20, 50, 100];
  }

  goToPreviousPage() {
    this.pageable.page -= 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.change.emit(this.pageable);
  }

  goToNextPage() {
    this.pageable.page += 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.change.emit(this.pageable);
  }

  rowsPerPageChanged() {
    this.change.emit(this.pageable);
  }
}
